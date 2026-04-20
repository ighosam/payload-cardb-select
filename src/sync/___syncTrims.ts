import { carDB } from '../car-db';
import { 
    parseEngine,
    parseDrivetrain,
    parseTransmission 
}from '../utilities/decodeTrims';

type YearRange = {
  minYear: number | null | string;
  maxYear: number | null | string;
};

export async function syncTrims(payload: any) {
  payload.logger.info('⏳ Syncing car trims...');

  const trims = carDB.getTrims();

  const currentYear = new Date().getFullYear()

  /*
   * ------------------------------------------------
   * 1️⃣ Load ALL models → map externalID → payloadID
   * ------------------------------------------------
   */

  const modelMap = new Map<string, string>();

  let modelPage = 1;
  let modelHasNext = true;

  while (modelHasNext) {
    const res = await payload.find({
      collection: 'car-models',
      limit: 100,
      page: modelPage,
      depth: 0,
    });

    for (const model of res.docs) {
      if (model.externalID) {
        modelMap.set(String(model.externalID), model.id);
      }
    }

    modelHasNext = res.hasNextPage;
    modelPage++;
  }

  payload.logger.info(`→ Loaded ${modelMap.size} models`);

  
/*
   * ------------------------------------------------
   * 1️⃣ Load ALL bodyStyles → map externalID → payloadID
   * ------------------------------------------------
   */

  const bodyMap = new Map<string, string>();

  let bodyPage = 1;
  let bodyHasNext = true;

  while (bodyHasNext) {
    const res = await payload.find({
      collection: 'body-styles',
      limit: 100,
      page: bodyPage,
      depth: 0,
    });

    for (const style of res.docs) {
      if (style.externalID) {
        bodyMap.set(String(style.externalID), style.id);
      }
    }

    bodyHasNext = res.hasNextPage;
    bodyPage++;
  }

  payload.logger.info(`→ Loaded ${bodyMap.size} bodyStyles`);

  //////////////////////////////////////////////////////
/*
   * ------------------------------------------------
   * 1️⃣ Load ALL driveTrains → map externalID → payloadID
   * ------------------------------------------------
   */

  const driveMap = new Map<string, string>();

  let drivePage = 1;
  let driveHasNext = true;

  while (driveHasNext) {
    const res = await payload.find({
      collection: 'drive-trains',
      limit: 100,
      page: drivePage,
      depth: 0,
    });

    for (const drive of res.docs) {
      if (drive.externalID) {
        driveMap.set(String(drive.externalID), drive.id);
      }
    }

    driveHasNext = res.hasNextPage;
    drivePage++;
  }

  payload.logger.info(`→ Loaded ${bodyMap.size} DriveTrains`);

  //////////////////////////////////////////////////////

  /*
   * ------------------------------------------------
   * 2️⃣ Load ALL existing trims
   * ------------------------------------------------
   */

  const existingIDs = new Set<string>();

  let trimPage = 1;
  let trimHasNext = true;

  while (trimHasNext) {
    const res = await payload.find({
      collection: 'car-trims',
      limit: 100,
      page: trimPage,
      depth: 0,
    });

    for (const doc of res.docs) {
      if (doc.externalID) {
        existingIDs.add(String(doc.externalID));
      }
    }

    trimHasNext = res.hasNextPage;
    trimPage++;
  }

  payload.logger.info(`→ Found ${existingIDs.size} existing trims`);

     /*
     * ------------------------------------------------
     * 3️⃣ Preload min/max years for all models at once
     * ------------------------------------------------
     */
    
    const modelYearRows = carDB.getTrimYearRanges(); // new function: SELECT model_id, MIN(year) AS minYear, MAX(year) AS maxYear FROM cardb GROUP BY model_id
    const yearMap = new Map<string, YearRange>();
    for (const row of modelYearRows) {
      yearMap.set(String(row.trim_id), { minYear: row.minYear, maxYear: row.maxYear });
    }

  /*
   * ------------------------------------------------
   * 3️⃣ Insert missing trims (WITH YEAR RANGE)
   * ------------------------------------------------
   */

  let inserted = 0;
  let skipped = 0;

  for (const trim of trims) {
    const externalID = String(trim.trim_id);

    if (existingIDs.has(externalID)) {
      skipped++;
      continue;
    }

    const modelID = modelMap.get(String(trim.model_id));
    if (!modelID) {
      skipped++;
      continue;
    }

    const styleID = bodyMap.get(String(trim.body_id));
    if(!styleID){
      skipped++;
      continue;
    }
    const driveID = driveMap.get(String(trim.drive_id))
      if(!driveID){
        skipped++
        continue
      }
    //forgot to check if trim id already exist and then skip.

     const label =
      trim.trim && String(trim.trim).trim().length
        ? String(trim.trim).trim()
        : 'Base'; // now i can try to find trim from external api

        
            //get the drivetrain from db if it exist
             const dr =
              trim.drive && ['AWD','4WD','FWD','RWD'].includes(trim.drive)
               ? trim.drive.trim().toLowerCase()
               : ''
         
             //const engine = parseEngine(label);
            // const drivetrain = dr||parseDrivetrain(label);
             const transmission = parseTransmission(label);
         

  const years = yearMap.get(trim.trim_id);
    if (!years?.minYear) {
      skipped++;
      continue;
    }

    const startYear = years.minYear;
    const endYear =
      Number.isFinite(years.maxYear) && years.maxYear !== currentYear
        ? years.maxYear
        : null;   

    try {
      await payload.create({
        collection: 'car-trims',
        data: {
          externalID,
          model: modelID,
          trim: label,

          style:styleID,
          drivetrain:driveID,
          transmission,

          // ✅ new fields
          startYear,
          endYear,
        },
        overrideAccess: true,
      });

      existingIDs.add(externalID);
      inserted++;
    } catch (err: any) {
      // duplicate safety
      if (
        err?.errors?.some((e: any) => e.path === 'externalID') ||
        err?.message?.includes('unique')
      ) {
        skipped++;
        continue;
      }

      throw err;
    }
  }

  payload.logger.info(
    `✅ Trims synced — inserted: ${inserted}, skipped: ${skipped}`
  );
}
