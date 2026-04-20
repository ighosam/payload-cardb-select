// plugins/payload-car-db/sync/syncCars.ts

//import { syncMakes } from './syncMakes';

import { ensureLegacySource } from './ensureLegacySource';
import { syncLegacyData } from '../importer/syncLegacyData';
import { PowerTrains } from '../collections/Powertrains';




export async function syncCars(payload: any) {
  payload.logger.info('🚗 Car DB sync started');

  try {
    await ensureLegacySource(payload)
    //await syncMakes(payload);
    await syncLegacyData(payload,'make')
    await syncLegacyData(payload,'bodyStyle')
    await syncLegacyData(payload,'model')
    await syncLegacyData(payload,'drivetrain')
    await syncLegacyData(payload,'trim')
    await syncLegacyData(payload,'powertrainType')
    await syncLegacyData(payload,'transmission')
    await syncLegacyData(payload,'powertrain')

    //await importLegacyModels(payload)
    //await syncGearBox(payload)
    //await syncDriveTrains(payload)
    //await syncBodyStyles(payload)
    //await syncModels(payload);
    //await syncEngines(payload)

    ///////////////////////////////
    //await syncYears(payload);
    //await syncModelYears(payload)

    ////////////////////////////
    //await syncTrims(payload);

    payload.logger.info('✅ Car DB sync completed successfully');
  } catch (error) {
    payload.logger.error('❌ Car DB sync failed');
    payload.logger.error(error);
    throw error;
  }
}
