// plugins/payload-car-db/sync/syncYears.ts

import { carDB } from '../car-db';

export async function syncYears(payload: any) {
  payload.logger.info('⏳ Syncing years...');

  const years = carDB.getYears();

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
      collection: 'car-models', // ⚠️ slug, not variable name
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
   * 2️⃣ Load ALL existing years
   * ------------------------------------------------
   */

  const existingIDs = new Set<string>();

  let yearPage = 1;
  let yearHasNext = true;

  while (yearHasNext) {
    const res = await payload.find({
      collection: 'car-years',
      limit: 100,
      page: yearPage,
      depth: 0,
    });

    for (const doc of res.docs) {
      if (doc.externalID) {
        existingIDs.add(String(doc.externalID));
      }
    }

    yearHasNext = res.hasNextPage;
    yearPage++;
  }

  payload.logger.info(`→ Found ${existingIDs.size} existing years`);

  /*
   * ------------------------------------------------
   * 3️⃣ Insert missing years safely
   * ------------------------------------------------
   */

  let inserted = 0;
  let skipped = 0;

  for (const row of years) {
    const modelExternalID = String(row.model_id);

    const modelID = modelMap.get(modelExternalID);
    if (!modelID) {
      skipped++;
      continue;
    }

    // ✅ stable derived external ID
    const externalID = `${row.model_id}-${row.year}`;



    if (existingIDs.has(externalID)) {
      skipped++;
      continue;
    }

    try {
      await payload.create({
        collection: 'car-years',
        data: {
          externalID,
          year: row.year,
          model: modelID,
        },
        overrideAccess: true,
      });

      existingIDs.add(externalID);
      inserted++;
    } catch (err: any) {
      // ✅ duplicate-safe (Next.js + restart)
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
    `✅ Years synced — inserted: ${inserted}, skipped: ${skipped}`
  );
}
