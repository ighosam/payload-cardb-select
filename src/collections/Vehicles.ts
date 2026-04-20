import { CollectionConfig } from 'payload';

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'externalID',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },

    {
      name: 'modelYear',
      type: 'relationship',
      relationTo: 'model-years',
      required: true,
      index: true,
    },

    {
      name: 'trim',
      type: 'relationship',
      relationTo: 'trims',
      required: false,
      index: true,
    },

    {
      name: 'fuelType',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Gasoline', value: 'gas' },
        { label: 'Diesel', value: 'diesel' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Plug-in Hybrid', value: 'phev' },
        { label: 'Electric', value: 'electric' },
      ],
    },

    {
      name: 'drivetrain',
      type: 'select',
      index: true,
      options: [
        { label: 'FWD', value: 'fwd' },
        { label: 'RWD', value: 'rwd' },
        { label: 'AWD', value: 'awd' },
        { label: '4WD', value: '4wd' },
      ],
    },

    {
      name: 'transmission',
      type: 'select',
      index: true,
      options: [
        { label: 'Automatic', value: 'automatic' },
        { label: 'Manual', value: 'manual' },
        { label: 'CVT', value: 'cvt' },
      ],
    },

    {
      name: 'title',
      type: 'text',
      admin: { readOnly: true },
      hooks: {
        beforeValidate: [
          async ({ data, req }) => {
            if (!data?.modelYear) return data;

            const modelYear = await req.payload.findByID({
              collection: 'model-years',
              id: data.modelYear,
            });

            const parts = [
              modelYear.model?.name,
              modelYear.year,
              data.trim?.name,
              data.fuelType?.toUpperCase(),
              data.drivetrain?.toUpperCase(),
            ].filter(Boolean);

            data.title = parts.join(' ');
            return data;
          },
        ],
      },
    },
  ],
};
