// plugins/car-db/collections/CarModels.ts
import { CollectionConfig } from 'payload';
export const CarTrims: CollectionConfig = {
  slug: 'car-trims',
      admin:{
        useAsTitle: 'name',
        hidden:true,
      },
  fields: [
     {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required:true,
      hooks:{
        beforeChange:[
          ({data})=>{
            return (data?.name).split('_')[0]
          }
        ]
      }
    },
    {
      name: 'identityKey',
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
      name: 'bodyStyle',
      type: 'relationship',
      relationTo: 'body-styles',
      required: true,
      index: true,
    },
    {
    name: 'drivetrain',
      type: 'relationship',
      relationTo:'drive-trains',
      required:true
    },
     
    // 👇 NEW FIELDS
    {
      name: 'startYear',
      type: 'number',
      required: true,
      index: true,
      //min: 1886, // first car ever 😄
      admin: {
        description: 'First year this trim was produced',
      },
    },
    {
      name: 'endYear',
      type: 'number',
      index: true,
      admin: {
        description: 'Last year this trim was produced (leave empty if still in production)',
      },
    },
    {
      name: 'lastSyncedAt',
      type: 'date',
    },
  ],
};


