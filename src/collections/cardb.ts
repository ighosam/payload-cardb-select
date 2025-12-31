import { CollectionConfig } from 'payload';
import { makeEndpoint } from '../enpoints/makeEndpoint';
import { modelEdnpoint } from '../enpoints/modelEndpoint';

export const CarDbEnpoint: CollectionConfig = {
  slug: 'car-db',
  access: {
    read: () => true, // Adjust permissions as needed
    create: () => false, // Disable creating documents if you only want endpoints
    update: () => false,
    delete: () => false,
  },
  admin: {
    hidden: true, // Hide from admin panel if you don't need UI
  },
  // No fields defined - completely empty collection
  fields: [],
  endpoints:[
    makeEndpoint,
    modelEdnpoint
  ]
}