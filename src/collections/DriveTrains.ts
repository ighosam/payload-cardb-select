// plugins/car-db/collections/CarModels.ts
import { CollectionConfig } from 'payload';

export const DriveTrains: CollectionConfig = {
  slug: 'drive-trains',
  admin: {
    useAsTitle: 'name',
    hidden: true,
  },
  fields: [
    
    {
      name: 'name',
      type: 'text',
      required: true,
      admin:{
      }
    },
  {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
     {
      name: 'identityKey',
      type: 'text',
      unique: true,
    },

  ]
};
