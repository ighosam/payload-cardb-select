// collections/BodyStyles.ts
import { CollectionConfig } from 'payload';

export const BodyStyles: CollectionConfig = {
  slug: 'body-styles',
  admin: { 
    useAsTitle: 'name',
    hidden:true,
   },
  access: { read: () => true },
  fields: [
    {
      name: 'identityKey',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },

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
      index: true,
    },
  ],
};