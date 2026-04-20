import { CollectionConfig } from 'payload'

export const CarMakes: CollectionConfig = {
  slug: 'car-makes',

  admin: {
    useAsTitle: 'name',
    //hidden:true
  },

  fields: [
      {
      name: 'identityKey',
      type: 'text',
      required: true,
      unique: true,
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
    },
  ],
}
