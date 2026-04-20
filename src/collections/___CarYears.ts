// plugins/car-db/collections/CarYears.ts
import { CollectionConfig } from 'payload';

export const CarYears: CollectionConfig = {
  slug: 'car-years',
  admin:{
    useAsTitle: 'year',
    //hidden:true
  },
  fields: [
    {
      name: 'externalID',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'car-models',
      required: true,
      index: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      index: true,
    },
    {
      name: 'lastSyncedAt',
      type: 'date',
    },
  ],
};
