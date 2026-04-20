import type { FilterOptionsProps } from 'payload';
import { CollectionConfig } from 'payload';
import { resolveVehicle } from '../utilities/resolveVehicle';
import { normalizeID } from '../utilities/normalize';

export const Listings: CollectionConfig = {
  slug: 'listings',
     admin: {
     useAsTitle: 'title',
    //hidden:true
  },

  fields: [
    /**
     * ─────────────────────────────
     * UI ONLY — MAKE
     * ─────────────────────────────
     */

    {
      name: 'make',
      type: 'relationship',
      relationTo: 'car-makes',
      admin: {
        description: 'UI-only',
      },
      hooks: {
        beforeChange: [() => undefined],
      },
    },

    /**
     * ─────────────────────────────
     * UI ONLY — MODEL
     * ─────────────────────────────
     */
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'car-models',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.make),
      },
      hooks: {
        beforeChange: [() => undefined],
      },
      filterOptions: ({ data }: FilterOptionsProps) => ({
        make: { equals: data.make },
      }),
    },

    /**
     * ─────────────────────────────
     * UI ONLY — YEAR
     * ─────────────────────────────
     */
    {
      name: 'year',
      type: 'relationship',
      relationTo: 'car-years',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.model),
      },
      hooks: {
        beforeChange: [() => undefined],
      },
      filterOptions: ({ data }: FilterOptionsProps) => ({
        model: { equals: data.model },
      }),
    },

    /**
     * ─────────────────────────────
     * UI ONLY — TRIM
     * ─────────────────────────────
     */
    {
      name: 'trim',
      type: 'relationship',
      relationTo: 'car-trims',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.year),
      },
      hooks: {
        beforeChange: [() => undefined],
      },
      filterOptions: ({ data }: FilterOptionsProps) => ({
        year: { equals: data.year },
      }),
    },

    /**
     * ─────────────────────────────
     * STORED — VEHICLE (canonical)
     * ─────────────────────────────
     */
    {
      name: 'vehicle',
      type: 'relationship',
      relationTo: 'vehicles',
      required: true,
      hidden:true
    },

    // listing-specific fields
    { name: 'price', type: 'number', required: true },
    { name: 'mileage', type: 'number' },
    {
      name: 'title',
      type: 'text',
      admin:{
        hidden:true,
        readOnly:true
      }
      
    
    }
  ],
  hooks: {
    
    beforeChange: [
      async ({ data, req }) => {
      

        if (!data.year) {
          throw new Error('year is required');
        }

        const vehicleID = await resolveVehicle({
          payload: req.payload,
          year:data.year,
          trim:data.trim,
        });
        data.vehicle = vehicleID.vehicleId;
        data.title = vehicleID.title
req.payload.logger.info(`vehicle title is ${vehicleID.vehicleId}`)


        // UI-only cleanup
        delete data.make;
        delete data.model;
        delete data.year;
        delete data.trim;

        return data;
      },
    ],
    
   
    afterRead: [
    async ({ doc, req }) => {
      if (!doc?.vehicle) return doc;

      // fetch year with model + make
      const vehicle = await req.payload.findByID({
        collection: 'vehicles',
        id: normalizeID(doc.year),
        depth: 4, // IMPORTANT
      });

      if (!vehicle || typeof vehicle.model !== 'object') return doc;

      const model = vehicle.model;
      const make = vehicle.make;
      const year = vehicle.year
      const trim = year.trim
      return {
        ...doc,

        // UI-only fields (not stored)
        make: make?.id ?? make,
        model: model?.id ?? model,
        year: year?.id ?? year,
        trim: trim.id ?? trim
      };
    },
  ],
  
  },
  
}
