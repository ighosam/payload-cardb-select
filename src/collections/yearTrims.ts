import type { CollectionConfig } from 'payload'

export const YearTrims: CollectionConfig = {
  slug: 'year-trims',

  admin: {
    useAsTitle: 'year',
    defaultColumns: ['name', 'make', 'model', 'trim'],
    hidden:true,
  },
  fields: [
    // YEAR
    {
      name: 'name',
      type: 'number',
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
      name: 'identityKey',
      type: 'text',
      unique: true,
    },
      {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    // MAKE
    {
      name: 'make',
      type: 'relationship',
      relationTo: 'car-makes',
      required: true,
      index: true,
    },

    // MODEL
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'car-models',
      required: true,
      index: true,
      
    },

    // TRIM
    {
      name: 'trim',
      type: 'relationship',
      relationTo: 'car-trims',
      required: true,
      index: true,
    },
  ],
}