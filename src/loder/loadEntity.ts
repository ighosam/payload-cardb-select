import { Payload } from "payload"

export const loadEntity = async (payload:Payload,entityType:string, sourceId:number|string)=>{
 
    const entityMap = new Map<string, Record<string,string>>()

let page = 1
  let hasNext = true

  while (hasNext) {
    const res = await payload.find({
      collection: 'entity-mappings',
      where: {
        and: [
          { source: { equals: sourceId } },
          { entityType: { equals: entityType } },
        ],
      },
      limit: 100,
      page,
      depth: 0,
    })

    for (const doc of res.docs) {
      if (doc.externalId && doc.internalId) {
         const internalRec = {
        internalId:String(doc.internalId),
        identityKey:doc.identityKey
      }
        entityMap.set(String(doc.externalId), internalRec)
      }
    }

    hasNext = res.hasNextPage
    page++
  }

  payload.logger.info(`mappingMap called by LOADER ${entityType}, size: ${entityMap.size}`)

  return entityMap
 }
 