import { CollectionConfig } from 'payload';

export const PowerTrains: CollectionConfig =
{
  slug: 'powertrains',
  fields: [
    
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
    },
    // 🔹 Raw data (from external DB)
    {
      name: 'powertrainType',
      type: 'relationship',
      relationTo:'powertrainTypes'
    },
      {
        name: 'power',
        type: 'number',

      },
    {
      name: 'powerUnit',
      type: 'select',
      options: ['hp', 'kwt'],
      hooks:{
        beforeChange:[
          ({data})=>{
            
          }
        ]
      }
    },

    // 🔹 Canonical (ALWAYS SAME UNIT)
    {
      name: 'totalPowerHp',
      type: 'number',
      //required: true,
    },

    // Optional (nice to have)
    {
      name: 'totalPowerKw',
      type: 'number',
    },

    {
      name: 'engineDisplacement',
      type: 'number', // cc
    },
     
  ],
}
