import { CollectionConfig } from 'payload';

export const CarBattery: CollectionConfig = {

  slug: 'batteries',
  fields: [
    { name: 'capacityKWh', type: 'number' },
    { name: 'rangeKm', type: 'number' },

    {
      name: 'identityKey',
      type: 'text',
      unique: true,
    },
  ],
}