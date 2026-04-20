
import { Collection, Payload } from 'payload';
import { loadEntity } from '../loder/loadEntity';
import { syncLegacyData } from '../importer/syncLegacyData';
import { getCollectionSlug } from '../utilities/getCollectionSlug';

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

type WalkParams = {
  fields: any[]
  row: any
  callback: (field: any, value: any, path: string) => Promise<void> | void
  parentPath?: string
}

export async function walkFields({
  fields,
  row,
  callback,
  parentPath = '',
}: WalkParams) {
  if (!fields || fields.length === 0) {
    console.log('⚠️ No fields to process')
    return
  }

  for (const field of fields) {
    
    // skip fields in your entity list
    const hasEntity = entities.some(doc => doc === field.name)
            if (hasEntity) continue

    //console.log('👉 Visiting field:', field)
    if (!field || typeof field !== 'object') continue
    if (!('name' in field)) continue

    const path = parentPath
      ? `${parentPath}.${field.name}`
      : field.name

    console.log('📍 Path:', path)

    // 🔁 GROUP
    if (field.type === 'group') {
      console.log('📦 Entering group:', path)

      await walkFields({
        fields: field.fields,
        row,
        callback,
        parentPath: path,
      })
      continue
    }
    // 🔁 ARRAY
    if (field.type === 'array') {
      console.log('📚 Entering array:', path)

      await walkFields({
        fields: field.fields,
        row,
        callback,
        parentPath: path,
      })
      continue
    }
   
    const value = row[field.name]       
   // console.log('✅ Leaf field:', path, 'value:', value, field.type)
    await callback(field, value, path)
  }
}

//----------------------------

function buildPowertrain(row: any) {
  return {
    horsepower: row.horsepower ?? null,
    torque: row.torque ?? null,

    engine: row.engine_cc
      ? {
          displacement: row.engine_cc / 1000,
          cylinders: row.cylinders ?? null,
          fuelType: row.fuel_type ?? null,
        }
      : undefined,

    battery: row.battery_kwh
      ? {
          capacityKWh: row.battery_kwh,
          rangeKm: row.range_km ?? null,
        }
      : undefined,

    motor: row.motor_kw
      ? {
          powerKW: row.motor_kw,
        }
      : undefined,
  }
}

/////////////////////////////////////////////////////

let entityMap: Record<string, any> = {}

export const legacyDataAdapter = async (
  row: any,
  payload: Payload,
  entityType: string
) => {
  const collectionSlug = getCollectionSlug(entityType) as string
  const collection: Collection = payload.collections[collectionSlug]

  const relationalData: Record<string, any>[] = []
  const nonRelationalData: Record<string, any>[] = []



  let sourceId = ''

  await walkFields({
    fields: collection.config.fields,
    row,

    callback: async (field, value, path) => {
      const fieldName = field.name
   
      // skip fields  in your entity list
      //const isEntity = entities.includes(fieldName)
      //if (isEntity && field.type === 'relationship') return

      // 🔗 RELATIONSHIP HANDLING
      if (field.type === 'relationship') {
        if (!sourceId) {
          const source = await payload.find({
            collection: 'external-sources',
            where: { name: { equals: 'LegacySQL' } },
          })
          sourceId = String(source.docs[0].id)
        }

        // load map once
        if (!entityMap.hasOwnProperty(`${fieldName}Map`)) {
          let relMap = await loadEntity(payload, fieldName, sourceId)

          if (relMap.size === 0) {
            relMap = await syncLegacyData(payload, fieldName)
          }

          entityMap = {
            ...entityMap,
            [`${fieldName}Map`]: relMap,
          }
        }

        relationalData.push({
          relationType: fieldName,
          relationMap: entityMap[`${fieldName}Map`],
          relationId: String(row[`${fieldName}_id`]),
        })

        return
      }
     /* 
      // 🧠 SPECIAL CASE: POWERTRAIN (IMPORTANT)
      if (fieldName === 'powertrain') {
        nonRelationalData.push({
          entityName: 'powertrain',
          entityValue: buildPowertrain(row), // 👈 custom mapper
        })
        return
      }
*/

     
      // 📦 NORMAL FIELD
      
      nonRelationalData.push({
        entityName: path,
        entityValue: value,
      })

    },
  })

  return {
    externalId: Number(row[`${entityType}_id`]),
    name: row[entityType],
    rawPayload: row,
    relationalData,
    nonRelationalData,
  }
}