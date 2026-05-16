// collections/ExternalSources.ts
import type { CollectionConfig } from 'payload'

export const ExternalSources: CollectionConfig = {
  slug: 'external-sources',
  admin: {
    useAsTitle: 'name',
    hidden:true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'SQL Database', value: 'sql' },
        { label: 'REST API', value: 'api' },
        { label: 'VIN Decoder API', value: 'vin' },
        { label: 'CSV Import', value: 'csv' },
      ],
    },
    {
      name: 'priority',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}