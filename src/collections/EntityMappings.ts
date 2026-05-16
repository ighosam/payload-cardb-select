// collections/EntityMappings.ts
import type { CollectionConfig } from 'payload'

export const EntityMappings: CollectionConfig = {
  slug: 'entity-mappings',
  admin: { 
    useAsTitle: 'externalId',
    hidden:true,
   },
  indexes: [
    {
      fields: ['source', 'entityType', 'externalId'],
      unique: true,
    },
  ],
  fields: [
    {
      name: 'source',
      type: 'relationship',
      relationTo: 'external-sources',
      required: true,
    },
    {
      name: 'entityType',
      type: 'select',
      required: true,
      options: [
         'make',
         'model',
         'generation',
         'bodyStyle',
         'yearTrim',
         'engine',
         'powertrain',
         'powertrainType',
         'drivetrain',
         'trim',
         'transmission',
         'vehicleConfiguration',
         'vehicle',
         'listing'
      ],
    },
    {
      name: 'externalId',
      type: 'text',
      required: true,
    },
    {
      name: 'externalPayload',
      type: 'json',
    },
    {
      name: 'internalId',
      type: 'text',
      required: true,
    },
     {
      name: 'identityKey',
      type: 'text',
      required: true
    },

    {
      name: 'confidenceScore',
      type: 'number',
      defaultValue: 1,
    },
  ],
}