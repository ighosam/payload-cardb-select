// adapters/legacyMakeAdapter.ts
import { Payload } from "payload"

export function adaptLegacyBodyStyle(row: any,payload:Payload) {
  return {
    externalId: String(row.body_id),
    name: row.body,
    rawPayload: row,
  }
}