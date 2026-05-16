import { beforeValidateTraverseFields, CollectionConfig } from 'payload';

export const CarModels: CollectionConfig = {
  slug: 'car-models',
  admin: {
    useAsTitle: 'name',
    hidden:true
  },
  fields: [
    {
      name: 'identityKey',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },

    {
      name: 'make',
      type: 'relationship',
      relationTo: 'car-makes',
     // required: true,
      //index: true,
      
    },

    {
      name: 'bodyStyle',
      type: 'relationship',
      relationTo: 'body-styles',
      //required: true,
      //index: true,
    },

    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'displayName',
      type: 'text',
     // required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
    },

    {
      name: 'startYear',
      type: 'number',
      index: true,
    },

    {
      name: 'endYear',
      type: 'number',
      index: true,
    },

    {
      name: 'lastSyncedAt',
      type: 'date',
    },
  ],
};