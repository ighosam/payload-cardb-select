// services/importLegacyMakes.ts
import type { Payload } from 'payload'

//import { normalizeMakeName } from '../utilities/normalizeMakeName';
import { legacyDataAdapter as adapter } from '../adapters/legacyDataAdapter';
//import { adaptLegacyModel as adapter } from '../adapters/legacyModelAdapter';
import { syncEntityBatches } from '../sync/syncEntityBatches';
//import { normalizeModelName as nomalizer } from '../utilities/normalizeModelName';
import { getLegacyData } from '../utilities/getLegacyData';
import { ExternalProps } from '../types';
import { getNormalizer } from '../utilities/getNormalizer';

 
export const syncLegacyData = 
async (payload:Payload,entityType:string) =>{
  const nomalizer = getNormalizer(entityType) as (name:string)=> string

  const rows = getLegacyData(entityType) as ExternalProps[];


  const source = await payload.find({
    collection: 'external-sources',
    where: { name: { equals: 'LegacySQL' } },
  }) 

  const sourceId = source.docs[0].id

  
   return await syncEntityBatches({
    payload,
    entityType:entityType,
    sourceId,
    rows:rows,
    adapter,
    nomalizer,
   })
}