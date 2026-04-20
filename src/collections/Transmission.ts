import { CollectionConfig } from 'payload';

export const Transmission: CollectionConfig = {
  slug: 'transmissions',
  admin: {
    useAsTitle: 'name',
    //hidden: true,
  },
  fields: [  
    {
      name: 'name',
      type: 'text',
      required: true,
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
