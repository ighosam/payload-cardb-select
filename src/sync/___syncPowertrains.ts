export async function syncPowertrains({
  payload,
  externalRows,
  engineMap, // externalEngineID → payload engine ID
}: {
  payload: any;
  externalRows: any[];
  engineMap: Map<string, string>;
}) {
  const powertrainMap = new Map<string, string>();

  for (const row of externalRows) {
    const type =
      row.fuel_type === 'electric'
        ? 'ev'
        : row.fuel_type === 'plug-in hybrid'
        ? 'phev'
        : row.fuel_type === 'hybrid'
        ? 'hybrid'
        : 'ice';

    const engineID = row.engine_id
      ? engineMap.get(String(row.engine_id))
      : null;

    const batteryKWh = row.battery_kwh ?? null;

    const externalID = [
      type,
      engineID ?? 'none',
      batteryKWh ?? '0',
    ].join(':');

    if (powertrainMap.has(externalID)) continue;

    const existing = await payload.find({
      collection: 'powertrains',
      where: { externalID: { equals: externalID } },
      limit: 1,
    });

    let powertrainID: string;

    if (existing.docs.length) {
      powertrainID = existing.docs[0].id;
    } else {
      const created = await payload.create({
        collection: 'powertrains',
        data: {
          externalID,
          type,
          engine: engineID,
          batteryKWh,
        },
        overrideAccess: true,
      });

      powertrainID = created.id;
    }

    powertrainMap.set(externalID, powertrainID);
  }

  return powertrainMap;
}
