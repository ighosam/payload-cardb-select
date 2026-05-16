import { CollectionConfig } from 'payload';

export const PowerTrains: CollectionConfig =
{
  slug: 'powertrains',
     admin: {
    hidden:true,
  },
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
            if((data?.name).includes('Electro')){
              return 'kwt'
            }
            return 'hp'
          }
        ]
      }
    },

    // 🔹 Canonical (ALWAYS SAME UNIT)
    {
      name: 'totalPowerHp',
      type: 'text',
      //required: true,
      hooks:{
        beforeChange:[
          ({data})=>{
           if((data?.name).includes('Electro')){
            
            return data?.power > 0 ? 
           `${data?.power}kwt`: String(data?.power)
           }
            return data?.power > 0 ?
            `${data?.power}hp`: String(data?.power)
          }
        ]
      }
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
