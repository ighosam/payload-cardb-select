import { normalizeBodyStyleName } from "./normalizeBodyStyleName"
import { normalizeModelName } from "./normalizeModelName"
import { normalizeMakeName } from "./normalizeMakeName"
import { normalizePowertrainType } from "./normalizePowertrainType"
import { normalizePowertrain } from './normalizePowertrain'
import { normalizeDrivetrain } from "./normalizeDrivetrain"
import { normalizeTransmission } from "./normalizeTransmission"
import { normalizeTrim } from "./normalizeTrim"
import { normalizeVehicle } from "./normalizeVehicle"


export const getNormalizer = (entityType:string) =>{
  
/*
   * -----------------------------------------
   *    This code return requested normalizer
   * ------------------------------------------
*/
     switch(entityType){

        case 'make':
           return normalizeMakeName
        case 'model':
             return normalizeModelName
        case 'bodyStyle':
             return normalizeBodyStyleName
        case 'powertrainType':
             return normalizePowertrainType
        case 'powertrain':
          return normalizePowertrain
        case 'drivetrain':
          return normalizeDrivetrain
          case 'transmission':
               return normalizeTransmission
          case 'trim':
               return normalizeTrim
          case 'vehicle':
               return normalizeVehicle     
     }
}