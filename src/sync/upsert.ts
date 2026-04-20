// plugins/payload-car-db/sync/upsert.ts

export async function upsert({
  payload,
  collection,
  externalID,
  data,
}: {
  payload: any;
  collection: string;
  externalID: string;
  data: Record<string, any>;
}) {
  const existing = await payload.find({
    collection,
    where: {
      externalID: { equals: externalID },
    },
    limit: 1,
  });

  if (!existing.docs[0]) {
    return payload.create({
      collection,
      data: {
        ...data,
        externalID,
        lastSyncedAt: new Date(),
      },
    });
  }

  return payload.update({
    collection,
    id: existing.docs[0].id,
    data: {
      ...data,
      lastSyncedAt: new Date(),
    },
  });
}
