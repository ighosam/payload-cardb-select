import type { FilterOptionsProps } from 'payload';
import { CollectionConfig } from 'payload';

export const Listings: CollectionConfig = {
  slug: 'listings',
     admin: {
     //useAsTitle: 'trim',
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
     * STORED — VEHICLE (canonical)
     * ─────────────────────────────
     */
  

    // listing-specific fields
 
    {
  name: 'trim',
  type: 'relationship',
  relationTo: 'car-trims',
  required: true,
  admin: {
    condition: (_, siblingData) => Boolean(siblingData?.model),
  },

   filterOptions: ({ data }: FilterOptionsProps) => ({
        model: { equals: data.model },
      }),
},
  ///////
 /////////////////////////////////
    ////////////////////////////////
     {
  name: 'year',
  type: 'relationship',
  relationTo: 'car-years',
  required: true,
     admin: {
    condition: (_, siblingData) => Boolean(siblingData?.trim),
  },

  filterOptions: async ({ data, req }) => {
   
    const trimId =
      typeof data?.trim === 'object'
        ? data.trim?.id
        : data?.trim

    const modelId =
      typeof data?.model === 'object'
        ? data.model?.id
        : data?.model

        
       //const trimId = data.trim
       //const modelId = data.model
  console.warn(`trimId is: ${typeof trimId} and modelId is: ${typeof modelId}`)

    if (!trimId || !modelId) {
      
      return false
    }
    
    const res = await req.payload.find({
      collection: 'car-trims',
      limit: 1,
      where: {
        and: [
          {
            id: {
              equals: trimId,
            },
          },
          {
            model: {
              equals: modelId,
            },
          },
        ],
      },
    })

    const trimDoc = res.docs[0]
  
    if (!trimDoc) {
      console.log(`NO QUERY RESULT`)
      return false
    }

    const years = []

  console.warn(`trimDoc.startYear is: ${trimDoc.startYear}`)

    for (let y = trimDoc.startYear; y <= trimDoc.endYear; y++) {
     
      years.push(y)
    }

    return {
      year: {
        in: years,
      },
    }
   
  },
},

  ////////
{
  name: 'vehicle',
  type: 'relationship',
  relationTo: 'vehicles',
  required: true,

    admin: {
    condition: (_, siblingData) => Boolean(siblingData?.year),
  },

   filterOptions: ({ data }: FilterOptionsProps) => ({
        trim: { equals: data.trim },
      }),

/*
  filterOptions: ({ data }: FilterOptionsProps) => {
        
     const where = {
          and:[
            {
              trim:{
                equals:data.trim
              },
              model:{
                equals:data.model
              },
              make:{
                equals:data.make
              }
            }
          ]
        }
       return where
      },
      */
},

{ name: 'price', type: 'number', required: true },
{ name: 'mileage', type: 'number' },


  ] 
}

