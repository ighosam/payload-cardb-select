import { carDB } from "../car-db"
/*
   * -----------------------------------------
   *    This code return requested lagacy data
   * ------------------------------------------
*/ 
export const getLegacyData = (entityType:string) =>{

    switch(entityType){

        case "make":
            return carDB.getMakes()
        case "model":
            return carDB.getModels()
        case "bodyStyle": 
            return carDB.getBodyTypes()
        case "trim": 
            return carDB.getTrims()
        case "powertrain":
            return carDB.getPowerTrains()
        case "powertrainType":
               return carDB.getPowerTrainTypes()
        case "drivetrain":
              return carDB.getDriveTrains()
        case 'transmission':
              return carDB.getGearBox()
        case 'vehicle':
              return carDB.getVehicles()
    }

}