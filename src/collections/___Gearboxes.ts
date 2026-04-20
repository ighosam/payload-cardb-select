// plugins/car-db/collections/CarModels.ts
import { CollectionConfig } from 'payload';

export const GearBoxes: CollectionConfig = {
  slug: 'gear-boxes',
  admin: {
    useAsTitle: 'gearbox',
    //hidden: true,
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
      name: 'gearbox',
      type: 'text',
      required: true,
    },
  ]
};
