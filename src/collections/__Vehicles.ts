import type { FilterOptionsProps } from 'payload';
import { CollectionConfig, Validate } from 'payload';
import { normalizeID } from '../utilities/normalize';

export const Vehicles:CollectionConfig = {
  slug: 'vehicles',
    admin: {
     useAsTitle: 'title',
    //hidden:true
  },
  
  fields: [
       /**
     * ─────────────────────────────────────
     * UI ONLY — MAKE
     * not stored in DB
     * ─────────────────────────────────────
     */
    {
      name: 'make',
      type: 'relationship',
      relationTo: 'car-makes',
      required: false,

      admin: {
        description: 'Used only for filtering — not saved',
      },
       hooks: {
        beforeChange: [() => undefined],//prevent saving
      },
    },
    
       /**
     * ─────────────────────────────────────
     * UI ONLY — MODEL
     * not stored in DB
     * ─────────────────────────────────────
     */
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'car-models',
      required: false,
     
       
       admin: {
        condition: (_, siblingData) => {
          return Boolean(siblingData?.make);
        },
         description: 'Used only for filtering — not saved',
      },
       hooks: {
        beforeChange: [ () => undefined ], //prevent saving
      },

       filterOptions: ({ data }:FilterOptionsProps) => ({
       make: { equals: data.make },
  }),
    },
      /**
     * ─────────────────────────────────────
     * STORED — YEAR
     * required
     * ─────────────────────────────────────
     */
    {
      name: 'year',
      type: 'relationship',
      relationTo: 'car-years',
      required: true,

       admin: {
        condition: (_, siblingData) => {
          return Boolean(siblingData?.model && siblingData.make);
        },
      },

      filterOptions: ({ data }:FilterOptionsProps) => ({
      model: { equals: data.model },
      }),

        validate: ((value, { siblingData }) => {
        if (!value) {
          return 'Year is required';
        }

        // modelUI must exist when choosing year
        if (!siblingData?.model) {
          return 'Select make and model first';
        }

        return true;
      }) satisfies Validate,

    },
     /**
     * ─────────────────────────────────────
     * STORED — TRIM
     * optional
     * ─────────────────────────────────────
     */
    {
      name: 'title',
      type: 'text',
      admin: {
      readOnly: true,
      hidden:true
    },
},

    {
      name: 'trim',
      type: 'relationship',
      relationTo: 'car-trims',
      required: true,
     
       admin: {
        condition: (_, siblingData) => {
          return Boolean(siblingData?.year);
        },
        description: 'Optional — not all vehicles have trims',
      },

        filterOptions: ({ data }:FilterOptionsProps) => ({
        year: { equals: data.year },
        }),

         validate: (async (value, { siblingData, req }) => {
        // trim is optional
        if (!value) return true;

        if (!siblingData?.year) {
          return 'Select year before trim';
        }

        // verify trim belongs to selected year
        const trim = await req.payload.findByID({
          collection: 'car-trims',
          id: value,
          depth: 0,
        });

        if (!trim || trim.year !== siblingData.year) {
          return 'Selected trim does not belong to the chosen year';
        }

        return true;
      }) satisfies Validate,
      
    },
    
  ],
  hooks: {
    
   beforeChange: [
    async ({ data, req }) => {
      const { year: yearID, trim: trimID } = data;

      if (!yearID) {
        throw new Error('Year is required');
      }

      // Fetch year → model → make
      const year = await req.payload.findByID({
        collection: 'car-years',
        id: normalizeID(yearID),
        depth: 2,
      });

      if (!year || typeof year.model !== 'object') {
        throw new Error('Invalid year/model relationship');
      }

      const model = year.model;
      const make = model.make;

      let trimLabel = '';

      if (trimID) {
        const trim = await req.payload.findByID({
          collection: 'car-trims',
          id: normalizeID(trimID),
          depth: 0,
        });

        if (trim) {
          trimLabel = `-${trim.label}`;
        }
        req.payload.logger.info(`trim is ${trim.label}`)
      }
          const title = [
            year.year,
            make.make,
            model.model,
            trimLabel.replace('-', ''),
            ]
            .filter(Boolean)
            .join('-');
     
          data.title = title
      
      // UI-only fields
      delete data.make;
      delete data.model;

      return data;
    },
  ],

    
      afterRead: [
    async ({ doc, req }) => {
      if (!doc?.year) return doc;

      // fetch year with model + make
      const year = await req.payload.findByID({
        collection: 'car-years',
        id: normalizeID(doc.year),
        depth: 2, // IMPORTANT
      });

      if (!year || typeof year.model !== 'object') return doc;

      const model = year.model;
      const make = model.make;

      return {
        ...doc,

        // UI-only fields (not stored)
        make: make?.id ?? make,
        model: model?.id ?? model,
      };
    },
  ],
  

  }

};
