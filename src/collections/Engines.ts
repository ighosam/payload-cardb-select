import { CollectionConfig } from 'payload';

export const Engines: CollectionConfig = {
  slug: 'engine-types',
  admin: {
    useAsTitle: 'title',
    hidden:true,
    defaultColumns: [
      'title',
      'fuelType',
      'displacement',
      'power'
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Deterministic ID from external sync
    {
      name: 'externalID',
      type: 'text',
      unique: true,
      required: true,
      index: true,
    },

    // Gas / diesel ONLY
    {
      name: 'fuelType',
      type: 'select',
      required: true,
      options: [
        { label: 'Gasoline', value: 'gasoline' },
        { label: 'Diesel', value: 'diesel' },
      ],
    },

    // Engine size in liters (e.g. 2.5)
    {
      name: 'displacement',
      type: 'number',
      required: true,
      admin: {
        step: 0.1,
        description: 'Engine displacement in liters',
      },
    },

    // Optional Power info
    {
      name: 'power',
      type: 'text',
      required: false,
      admin: {
        description: 'Engine power in horse power(e.g. 260Hp)',
      },
    },

    // Auto-generated display name
    {
      name: 'title',
      type: 'text',
      admin: {
        readOnly: true,
      },
      
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (!data) return data;

            const parts = [
              data.displacement ? `${data.displacement}L` : null,
              `${data.power}Hp`,
              data.fuelType
            ].filter(Boolean);

            data.title = parts.join(' ');
            return data.title;
          },
        ],
      },
      
    },
  ],
};
