import type { Block } from 'payload'
import { makeField } from '../fields/makeField'
import { modelField } from '../fields/modelField' // dynamic select depending on make

export const VehicleBlock: Block = {
  slug: 'vehicle',
  labels: {
    singular: 'Vehicle',
    plural: 'Vehicles',
  },
  fields: [
    makeField,  // dynamic select for make
    modelField, // dynamic select for model, depends on make
    {
      name: 'year',
      type: 'number',
    },
  ],
}
