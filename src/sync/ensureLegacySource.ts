import { Payload } from "payload"

export async function ensureLegacySource(payload:Payload) {
  const existing = await payload.find({
    collection: 'external-sources',
    where: { name: { equals: 'LegacySQL' } },
  })

  if (existing.totalDocs > 0) {
    return existing.docs[0]
  }

  return await payload.create({
    collection: 'external-sources',
    data: {
      name: 'LegacySQL',
      type: 'sql',
      priority: 1,
      isActive: true,
    },
  })
}