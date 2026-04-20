import { Payload } from 'payload';

export const adaptLegacyMake = (row: any,payload:Payload) => {

  return {
    externalId: String(row.make_id),
    name: row.make,
    rawPayload: row,
   
  }
}