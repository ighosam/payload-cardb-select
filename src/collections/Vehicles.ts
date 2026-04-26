import { CollectionConfig, Validate } from 'payload';

export const Vehicles:CollectionConfig = {
  slug: 'vehicles',
    admin: {
     useAsTitle: 'name',
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
      name: 'name',
      type: 'text',
      required: true,
     },
      {
      name: 'identityKey',
      type: 'text',
      unique: true,
    },
      {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },

    {
      name: 'make',
      type: 'relationship',
      relationTo: 'car-makes',
      required: false,

      admin: {
        description: 'Used only for filtering — not saved',
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
         description: 'Used only for filtering — not saved',
      },
  
    },
  
     /**
     * ─────────────────────────────────────
     * STORED — TRIM
     * optional
     * ─────────────────────────────────────
     */

{
  name: 'drivetrain',
  type: 'relationship',
  relationTo: 'drive-trains'
},
    {
      name: 'trim',
      type: 'relationship',
      relationTo: 'car-trims',
      required: true,   
       admin: {
        description: 'Optional — not all vehicles have trims',
      },     
    },

    {
     name: 'transmission',
     type: 'relationship',
     relationTo:'transmissions'
    },
     
  ],
};
