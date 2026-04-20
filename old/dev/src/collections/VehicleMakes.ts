import { before } from 'node:test'
import type { CollectionConfig } from 'payload'
export const VehicleMakes: CollectionConfig = {
  slug: 'vehicleMake',
  fields: [
         {
          name: 'title',
          type: 'text',
         },
  ],

}



