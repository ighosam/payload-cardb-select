// fields/vehicleGroup.ts
import type { Field } from 'payload'
import { makeField } from '../fields/makeField'
import { modelField } from '../fields/modelField'

export const vehicleGroupField: Field = {
  name: 'vehicle',
  type: 'group',
  fields: [
    makeField,
    modelField
  ],
}
