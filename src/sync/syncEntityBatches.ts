import type { Payload } from 'payload'
import { slugify } from '../utilities/slugify'
import { ExternalProps } from '../types'
import { loadEntity } from '../loder/loadEntity'
import { loadCollection } from '../loder/loadCollection'
import { getCollectionSlug } from '../utilities/getCollectionSlug'
import { mapDrive } from '../utilities/mapDrive'
import { id } from 'payload/i18n/id'

export async function syncEntityBatches({
  payload,
  entityType,
  sourceId,
  rows,
  adapter,
  nomalizer,
}: {
  payload: Payload
  entityType: string
  rows: ExternalProps[]
  sourceId: string | number
  adapter: (
    row: ExternalProps,
    payload: Payload,
    entityType: string
  ) => any
  nomalizer: (name: string) => string
}) {

  /*
   * -------------------------
   * Load entity mappings
   * -------------------------
   */
  const collection = getCollectionSlug(entityType) as string
  const entityMap = await loadEntity(payload, entityType, sourceId)

  /*
   * -------------------------
   * Load canonical entities
   * -------------------------
   */
  const keyMap = await loadCollection(payload, collection)

  /*
   * -------------------------
   * Process rows
   * -------------------------
   */

  for (const row of rows) {
    const adapted = await adapter(row, payload, entityType)
   // console.warn(`${row.startYear}`)

   //if(!adapted.enternalId) continue

    if (entityMap.has(String(adapted.externalId))) continue
///////////////
    //console.warn(adapted.relationalData.entityValue)
///////////

    let skipped = false
    let relData: Record<string, any> = {}
    const relKey: string[] = []

    /*
     * -------------------------
     * Process relations
     * -------------------------
     */

    if (adapted.relationalData?.length > 0) {

      for (const rel of adapted.relationalData) {

        if (!rel.relationId ) {
          skipped = true
          break
        }

        const relInternal = rel.relationMap.get(String(rel.relationId))

        if (!relInternal?.internalId) {
          skipped = true
          break
        }

        relKey.push(relInternal.identityKey)

        relData = {
          ...relData,
          [`${rel.relationType}`]: Number(relInternal.internalId)
        }
      }
    } /* End of process relation */

    if (skipped) continue

    /*
     * -----------------------------
     * Compute non relational data
     * -----------------------------
     */

    if (adapted.nonRelationalData?.length > 0) {
      for (const nonRel of adapted.nonRelationalData) {
        relData = {
          ...relData,
          [`${nonRel.entityName}`]: nonRel.entityValue
        }
      }
    } /* End of non relation computation */

    /*
     * -------------------------
     * Normalize name
     * -------------------------
     */

      /*
    This is where we test for driveTrain, or engine  or trim for entityType

    */
//////////////////////////////
/////////////////////////////



    //let normalized = nomalizer(adapted.name)
       let normalized = adapted.name

       if(!normalized) continue
   
/*
    if(entityType === 'trim'){
       if(adapted.name === '' || adapted.name === null){
        normalized = 'Base'
       }else normalized = mapDrive(adapted.name)
    }
*/

    const slug = slugify(normalized)?.trim()
     //const slug = slugify(normalized)
  

    if (!slug) {
      payload.logger.warn(
        `Skipping ${entityType} '${adapted.name}' externalId:${adapted.externalId}`
      )
      continue
    }

  
    const entityKeyForm = `${entityType}:${slug}`
    relKey.push(entityKeyForm)

    const identityKey = relKey.join('-')
    let intRec =  entityMap.get(adapted.externalId)
    //let internal = keyMap.get(identityKey)
    let internal = intRec?.internalId

    /*
     * -------------------------
     * Create canonical entity
     * -------------------------
     */
   

    if (!internal) {

      const formattedName =
        normalized.length > 0
          ? normalized[0].toUpperCase() + normalized.slice(1)
          : normalized
     
      const data: Record<string, any> = {
        name: formattedName,
        identityKey,
        slug,
        ...relData
      }
  

      let result = await payload.create({
        collection,
        data,
      })
      internal = String(result.id)
     
         const internalRec = {
        internalId:String(result.id),
        identityKey:result.identityKey
      }

      entityMap.set(adapted.externalId, internalRec)
    }

    /*
for (const doc of res.docs) {
      if (doc.externalId && doc.internalId) {
         const internalRec = {
        internalId:String(doc.internalId),
        identityKey:doc.identityKey
      }
        entityMap.set(String(doc.externalId), internalRec)
      }
    }

    */

    /*
     * -------------------------
     * Create mapping entity
     * -------------------------
     */
   
    await payload.create({
      collection: 'entity-mappings',
      data: {
        source: sourceId,
        entityType,
        identityKey,
        externalId: String(adapted.externalId),
        internalId: String(internal),
        externalPayload: row || {},
        confidenceScore: 1,
      },
    })

    const internalRec = {
      internalId: String(internal),
      identityKey,
    }

    entityMap.set(String(adapted.externalId), internalRec)
  }

  return entityMap
}