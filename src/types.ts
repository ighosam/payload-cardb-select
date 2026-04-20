import type {JsonObject} from 'payload'
export interface PluginOptions {
    slug?:string
}

/*
* ----------------------------
*   External db or api types
* ----------------------------
* 
*/
export type Range = Record<string,number>
export type ExternalProps = Record<string,string>
export type ExternalRangeProps = Record<string,number>
export type ExternalNumStrProps = Record<string,string|number>
/*
* ----------------------------
*   Entity types
* ----------------------------
*/
export interface MakeProps {
  externalId:string,
  name:string,
  rawPayload:JsonObject
}

export interface BodyStyleProps {
  externalId:string,
  name:string,
  rawPayload:JsonObject
}

export interface EntityProps {
  externalId:string,
  name:string,
  rawPayload:JsonObject,

  relationData?:
    {
      externalId: string,
      collection: string,
      entityType:string,
      entityMap:Map<string,Record<string,string>>,
    }[],
    restData?:{
      entityName:string,
      entityValue:string
    }[] 
 
}

/*
export interface ModelProps {
  externalId:string,
  name:string,
  rawPayload:JsonObject,
  externalMakeId:string,
  externalStyleId:string
}

//export type ExternalMake = Record<string,string|number|null>


export interface ExternalGearBox {
  gearbox_id:string,
  gearbox:string,
  trim:string
}

export interface ExternalDriveTrains {
  drive: string,
  drive_id: string
}

export interface ExternalModel {
  model_id: string;
  model: string;
  make_id:  string;
  body_id: string
}

export interface ExternalYear {
  model_id:  string;
  year: string;
  generation:string,
  model:string
}

export interface ExternalTrim {
  trim: string;
  trim_id:  string;
  model_id:  string,
  body_id: string,
  drive_id:string
  year:  string | number,
  drive: string
}
export interface Vehicles {
  trim_id:  string;
  model_id:  string,
  year:  string | number,
  engine_type:string,
  trim:string
  drive: string,
  gearbox:string

}

export interface DerivedYears{
  modelID?:number,
  trimID?:number,
  year: string,

}
export type ModelYearRangeRow = {
  model_id: number;
  minYear: number | null;
  maxYear: number | null;
};
export type TrimYearRangeRow = {
  trim_id: number;
  minYear: number | null;
  maxYear: number | null;
};
export type BodyStylesType = {
  body: string,
  body_id:number
}
export type EngineType = {
  engine_type: string,
  engine_power: string,
  engine_volume:string
}
//==========================
*/



