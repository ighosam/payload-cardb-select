import { CollectionConfig } from 'payload';

export const CarTrims: CollectionConfig = {
  slug: 'car-trims',

  admin: {
    useAsTitle: 'label',
    defaultColumns: [
      'label',
      'engine',
      'transmission',
      'drivetrain',
      'year',
    ],
  },

  fields: [
    /**
     * External trim identifier
     * Comes directly from your external DB (trim_id)
     */
    {
      name: 'externalID',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'External trim_id from source database',
      },
    },

    /**
     * Human-readable trim label
     * Example: "1.4 MT (62 Hp) 4WD"
     */
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Raw trim label from external source',
      },
    },

    /**
     * Trim belongs to a specific year
     * (year already implies model + make)
     */
    {
      name: 'year',
      type: 'relationship',
      relationTo: 'model-years',
      required: true,
    },

    /**
     * Engine description (parsed)
     * Example: "1.4L (62 HP)"
     */
    {
      name: 'engine',
      type: 'text',
    },

    /**
     * Drivetrain (normalized enum)
     */
    {
      name: 'drivetrain',
      type: 'select',
      options: [
        { label: 'FWD', value: 'fwd' },
        { label: 'RWD', value: 'rwd' },
        { label: 'AWD', value: 'awd' },
        { label: '4WD', value: '4wd' },
      ],
    },

    /**
     * Transmission (normalized enum)
     */
    {
      name: 'transmission',
      type: 'select',
      options: [
        { label: 'Automatic', value: 'automatic' },
        { label: 'Manual', value: 'manual' },
        { label: 'CVT', value: 'cvt' },
        { label: 'DCT', value: 'dct' },
      ],
    },
  ],
};
