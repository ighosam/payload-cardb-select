
import { Collection, Payload } from 'payload';
import { loadEntity } from '../loder/loadEntity';
import { syncLegacyData } from '../importer/syncLegacyData';
import { getCollectionSlug } from '../utilities/getCollectionSlug';
import { EntityType } from '@payloadcms/ui/shared';
import { getName } from '../utilities/getName';
import { getExternalId } from '../utilities/getExternalId';


/////////////////////////////////////////////////////

let entityMap: Record<string, any> = {}


export const legacyDataAdapter = async (row:any,payload:Payload,entityType:string) => {
  const collectionSlug = getCollectionSlug(entityType) as string

const collection:Collection = payload.collections[collectionSlug]
//const fields = collection.config.fields
const relationalData:Record<string,any> = []
const nonRelationalData:Record<string,any> = []
/*
const entities = [
        'make',
        'model',
        'generation',
        'bodyStyle',
        'modelYear',
        'engine',
        'powertrain',
        'trim',
        'vehicleConfiguration',
]
*/
 const entities =[
  'identityKey',
  'name',
  'displayName',
  'lastSyncedAt',
  'slug',
  'updatedAt',
  'createdAt'
 ]

//payload.logger.info(entities.docs)

let sourceId = ''

for (const field of collection.config.fields){
 
  if('name' in field)

       /*
          * ------------------------------------------------------
          *  if('name in field') is needed for field.name to work
          * ------------------------------------------------------
       */
       if('name'in field){ 

     //skip for the conditions below. 
     //can also check that if field.name is not of type entityMap  

  /*
    if( field.name === 'slug' 
      || field.name === 'updatedAt'
      || field.name === 'createdAt'
      || field.name === 'displayName'
      || field.name === 'lastSyncedAt'
      || field.name === 'identityKey'
      || field.name === 'name'
    ) continue
     */
  const hasMake = entities.some(doc => doc === field.name)
            if (hasMake) continue
      /*
        * -----------------------------------
        *   Map relational data for adapter
        * -----------------------------------
      */
     //if("name" in field)
      // console.log(`THE NAME IS: ${field.name} AND THE TYPE IS: ${field.type}`)
    //only run this code for relationship field
    if(field.type === 'relationship' ){ // if(field.type === 'relationship' && 'name' in field)
      
      /* 
        * ----------------------------------------------
        *   This block of code run once to save sourceId
        * -----------------------------------------------
      */
    if (!sourceId) {
      
      //find source id
      const source = await payload.find({
      collection: 'external-sources',
       where: { name: { equals: 'LegacySQL' } },
  })
      sourceId = String(source.docs[0].id)

}/* End of sourceId */
     /*
        *------------------------------------
        *   Only create one Map per entity
        *------------------------------------
     */
     if(!entityMap.hasOwnProperty(`${field.name}Map`)){
    
      let relMap = await loadEntity(payload, field.name, String(sourceId))
      if(relMap.size === 0) relMap = await syncLegacyData(payload,field.name)
      
         entityMap = {
      ...entityMap,
      [`${field.name}Map`]:relMap
     }  
    }  /* End of Map creation */

      /*
        * ------------------------------------------------
        *   Save relational data to relationalData array
        * -----------------------------------------------
      */
      relationalData.push({
         relationType: field.name,
         relationMap:entityMap[`${field.name}Map`],
         relationId: String(row[`${field.name}_id`])
      }) /* End of save */  

}   /* End of map relaitional data */
  

 
     /*
        *-----------------------------------------------------
        *  Save non relational data to nonRelationaData array
        *-----------------------------------------------------
     */

      if(field.type != 'relationship'){
      

       // payload.logger.warn(`field is : ${field.name}`)

              nonRelationalData.push({
              entityName: field.name,
              entityValue: row[`${field.name}`]

             })
             
      } /* End of save non relational data */
      /*
      let externalId = null
      let name = ''
      if(entityType === 'powertrain'){
        if(row['powertrain'] && row['engineDisplacement'])
      externalId = `${row[entityType]}-${row['power']}:${row['engineDisplacement']}`

      }else {
        externalId = row[`${entityType}_id`]
      }

      console.warn(`externalId is ${externalId}`)
      console.warn(`row['engineDisplacement'] is ${row['engineDisplacement']}`)

      */
}

}


/////////////////////////////
/*
 let externalId = null
 let name = ''
      if(entityType === 'powertrain'){
        externalId = `${row[entityType]}:${row['power']}`
        //name = `${row[entityType]}:${row['power']}`
        name = row[entityType]
      }else {
        //externalId = Number(row[`${entityType}_id`])
        externalId = row[`${entityType}_id`]
        name = row[entityType]
      }
 */   
const name = getName(row,entityType)
const externalId = getExternalId(row,entityType)

/////////////////////////////
    return {
    //externalId: Number(row[`${entityType}_id`]),
    externalId,
    name,
    rawPayload: row,

    relationalData,
    nonRelationalData
  }
}
