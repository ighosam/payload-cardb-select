// plugins/payload-car-db/sync/syncVehicles.ts

import { carDB } from '../car-db';
import { 
    parseEngine,
    parseDrivetrain,
    parseTransmission 
} from '../utilities/decodeTrims';

export async function syncVehicles(payload: any) {
  payload.logger.info('⏳ Syncing vehicles...');

  const rows = carDB.getVehicles(); // external source rows

  /*
   * ------------------------------------------------
   * 1️⃣ Load ALL existing vehicles
   * ------------------------------------------------
   */
  const existingIDs = new Set<string>();

  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const res = await payload.find({
      collection: 'vehicles',
      limit: 100,
      page,
      depth: 0,
    });

    for (const doc of res.docs) {
      if (doc.externalID) {
        existingIDs.add(String(doc.externalID));
      }
    }

    hasNext = res.hasNextPage;
    page++;
  }

  payload.logger.info(`→ Found ${existingIDs.size} existing vehicles`);

  /*
   * ------------------------------------------------
   * 2️⃣ Load related model-years and trims
   * ------------------------------------------------
   */
  // Load model-years → externalID → payloadID
  const modelYearMap = new Map<string, string>();
  let myPage = 1;
  let myHasNext = true;

  while (myHasNext) {
    const res = await payload.find({
      collection: 'model-years',
      limit: 100,
      page: myPage,
      depth: 0,
    });

    for (const doc of res.docs) {
      if (doc.externalID) {
        modelYearMap.set(String(doc.externalID), doc.id);
      }
    }

    myHasNext = res.hasNextPage;
    myPage++;
  }

  payload.logger.info(`→ Loaded ${modelYearMap.size} model-years`);

  // Load trims → externalID → payloadID
  const trimMap = new Map<string, string>();
  let trimPage = 1;
  let trimHasNext = true;

  while (trimHasNext) {
    const res = await payload.find({
      collection: 'trims',
      limit: 100,
      page: trimPage,
      depth: 0,
    });

    for (const doc of res.docs) {
      if (doc.externalID) {
        trimMap.set(String(doc.externalID), doc.id);
      }
    }

    trimHasNext = res.hasNextPage;
    trimPage++;
  }

  payload.logger.info(`→ Loaded ${trimMap.size} trims`);

  /*
   * ------------------------------------------------
   * 3️⃣ Insert missing vehicles safely
   * ------------------------------------------------
   */
  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const modelYearKey = `${row.model_id}-${row.year}`;
    const modelYearID = modelYearMap.get(modelYearKey);
    if (!modelYearID) {
      skipped++;
      continue;
    }

    const trimKey = row.trim_id ? String(row.trim_id) : '';
    const trimID = trimKey ? trimMap.get(trimKey) ?? null : null;
    
    /////////////////////////////////////////////////
     const label =
           row.trim && String(row.trim).trim().length
             ? String(row.trim).trim()
             : 'Base'; // now i can try to find trim from external api
            
             //get the drivetrain from db if it exist
         const dr =
          row.drive && ['AWD','4WD','FWD','RWD'].includes(String(row.drive))
           ? String(row.drive).trim().toLowerCase()
           : ''
         const engine = parseEngine(label);
         const drivetrain = dr||parseDrivetrain(label);
         const transmission = parseTransmission(label);

    /////////////////////////////////////////////////

    // ✅ stable externalID from external data
    const externalID = [
      modelYearKey,       // keep external model_id + year
      trimID ?? 'base',
      row.engine_type,
      row.drive ?? 'unknown',
      row.gearbox ?? 'unknown',
    ].join(':');

    if (existingIDs.has(externalID)) {
      skipped++;
      continue;
    }

    const data = {
      externalID,
      modelYear: modelYearID,
      trim: trimID,
      fuelType: row.engine_type,
      drivetrain: row.drive ?? null,
      transmission: row.gearbox ?? null,
    };

    try {
      await payload.create({
        collection: 'vehicles',
        data,
        overrideAccess: true,
      });

      existingIDs.add(externalID);
      inserted++;
    } catch (err: any) {
      // ⚡ duplicate-safe
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
    `✅ Vehicles synced — inserted: ${inserted}, skipped: ${skipped}`
  );
}
