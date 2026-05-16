import type { CollectionConfig } from 'payload'

export const CarYears: CollectionConfig = {
  slug: 'car-years',

  admin: {
    useAsTitle: 'year',
    hidden:true,
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      unique: true,
      min: 1900,
      max:  new Date().getFullYear(),
    },
  ],
}