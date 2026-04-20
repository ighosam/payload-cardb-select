// car-db/index.ts
import Database from 'better-sqlite3';
import type { ExternalProps, ExternalRangeProps} from '../types';


const db = new Database('../cardb.db');

export const carDB = {
getMakes():ExternalProps[] {
return db.prepare('SELECT DISTINCT make_id, make FROM cardb')
.all()as ExternalProps[]
},

getGearBox():ExternalProps[] {
return db.prepare(`SELECT DISTINCT 
  gearbox_id As transmission_id, 
  gearbox AS transmission
  FROM cardb`)
.all()as ExternalProps[]
},

getDriveTrains():ExternalProps[] {
return db.prepare(`SELECT DISTINCT 
  drive_id AS drivetrain_id,
  drive AS drivetrain
  FROM cardb ORDER BY drive_id DESC`)
.all()as ExternalProps[]
},
/*
   * ------------------------------------- 
   *  When executing sqlite request
   *  use the As key follow by a matching
   *  payload collection field word
   * ------------------------------------
*/
getModels():ExternalProps[] {
return db.prepare(`SELECT DISTINCT 
  model_id, 
  make_id,
  body_id as bodyStyle_id, 
  model,
  MIN(year) AS startYear,
  MAX(year) AS endYear
   FROM cardb
   GROUP BY model_id,make_id,body_id,model
   `
  )
.all() as ExternalProps[]
},


getTrims():ExternalProps[] {
return db.prepare(`SELECT DISTINCT 
  trim_id, 
  model_id, 
  body_id as bodyStyle_id,
  drive_id as drivetrain_id, 
  MIN(year) AS startYear,
  MAX(year) AS endYear,
  trim
  FROM cardb
   GROUP BY model_id,trim_id,body_id,drive_id,drive,trim
  `)
.all()as ExternalProps[]
},
/*
getBattery():ExternalProps[] {
  return db
  .prepare('SELECT DISTINC ')
},
*/
getYears():ExternalProps[] {
  return db
    .prepare('SELECT DISTINCT model_id, year,generation,model FROM cardb')
    .all()as ExternalProps[];
},
getVehicles():ExternalProps[]{
  return db
  .prepare('SELECT DISTINCT model_id,year,trim_id,trim,engine_type,drive,gearbox FROM cardb')
  .all()as ExternalProps[]
},

getModelYearRanges():ExternalRangeProps[]{
  return db
  .prepare(`  SELECT
    model_id,
    MIN(year) AS minYear,
    MAX(year) AS maxYear
 FROM cardb
  GROUP BY model_id`).all() as ExternalRangeProps[]
},

getTrimYearRanges():ExternalRangeProps[]{
  return db
  .prepare(`  SELECT
    trim_id,
    MIN(year) AS minYear,
    MAX(year) AS maxYear
  FROM cardb
  GROUP BY model_id`).all() as ExternalRangeProps[]
},
getBodyTypes():ExternalProps[]{
  return db
  .prepare(`SELECT DISTINCT 
    body as bodyStyle, 
    body_id as bodyStyle_id
    FROM cardb`).all() as ExternalProps[]
},
getEngineTypes():ExternalProps[]{
  return db
  .prepare(`SELECT DISTINCT engine_type, engine_power, engine_volume FROM cardb`).all() as ExternalProps[]
},

getPowerTrains():ExternalProps[]{
  return db
  .prepare(`SELECT DISTINCT 
    engine_type AS powertrain,
    engine_power AS power, 
    engine_type_id AS powertrainType_id, 
    engine_volume AS engineDisplacement
    FROM cardb`).all() as ExternalProps[]
},
getPowerTrainTypes():ExternalProps[]{
  return db
  .prepare(`SELECT DISTINCT 
    engine_type AS powertrainType, 
    engine_type_id AS powertrainType_id
    FROM cardb`).all() as ExternalProps[]
}

}