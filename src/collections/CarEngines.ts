import { CollectionConfig } from 'payload';
export const CarEngines: CollectionConfig = {
  slug: 'engines',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: ['gasoline', 'diesel'],
      required: true,
    },

    {
      name: 'displacement',
      type: 'number', // store in cc
      label: 'Displacement (cc)',
    },

    {
      name: 'powerHp',
      type: 'number',
    },

    {
      name: 'cylinders',
      type: 'number',
    },
  ],
}