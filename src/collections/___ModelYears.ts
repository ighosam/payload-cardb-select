import { CollectionConfig } from 'payload';
import { normalizeID } from '../utilities/normalize';

export const ModelYears: CollectionConfig = {
  slug: 'model-years',
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
      name: 'model',
      type: 'relationship',
      relationTo: 'car-models',
      required: true,
      index: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      index: true,
    },
    {
      name: 'generation',
      type: 'text',
      required: false,
      index: true,
      admin: {
        description: 'Model generation or facelift (e.g. Gen 5, Facelift)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required:false,
      admin: { readOnly: true },
        hooks:{
          beforeValidate:[
              async ({ value, data, req }) => {
      if (!data?.model || !data?.year) return value;

      const modelDoc = await req.payload.findByID({
        collection: 'car-models',
        id: normalizeID(data.model),
      });

      return `${modelDoc.model} ${data.year}`;
    },
          ]
        }
    },
  ],
  
};
