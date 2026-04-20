import { Config, CustomComponent, Payload, Plugin } from 'payload';
import { CarMakes } from './collections/CarMakes';
import { CarModels } from './collections/CarModels';
//import { ModelYears } from './collections/ModelYears';
import { syncCars } from './sync/syncCars';
import { syncCarsEndpoint } from './enpoints/syncEndpoint';
import { CarTrims } from './collections/CarTrims';
import { Vehicles } from './collections/Vehicles';
import { Listings } from './collections/Listings';
import { BodyStyles } from './collections/BodyStyles';
import { DriveTrains } from './collections/DriveTrains';
import { ExternalSources } from './collections/ExternalSources';
import { EntityMappings } from './collections/EntityMappings';
import { PowertrainTypes } from './collections/PowerTrainTypes';
import {PowerTrains} from './collections/Powertrains'
import { Transmission } from './collections/Transmission';

export const payloadCardbSelect = ():Plugin => {
  return (incomingConfig):Config => {

    return {
        ...incomingConfig,
         collections: [
          ...(incomingConfig.collections || []),
            EntityMappings,
            ExternalSources,
            CarMakes,
            BodyStyles,
            Transmission,
            DriveTrains,
            CarModels,
            PowertrainTypes,
             PowerTrains,
           
           // ModelYears,
            CarTrims,
            
          
         // Vehicles,
         // Listings
        ],   
  
     endpoints:[
        ...(incomingConfig.endpoints || []),
        syncCarsEndpoint
     ],
              onInit: async (payload) => {
      console.log('CarSyncPlugin initializing...');
      // optional auto-sync on startup

       //console.log('Registered collections:')
       //console.log(Object.keys(payload.collections))
      
      await syncCars(payload);
      console.log('CarSyncPlugin sync complete.');
    },
    }
    
    
 
   
  };
};

//export default payloadCardbSelect;
