import { CollectionConfig } from 'payload';

export const PowertrainTypes: CollectionConfig =
{
  slug: 'powertrainTypes',
   admin: {
    useAsTitle: 'name',
    hidden:true,
  },
  fields: [

     {
      name: 'name',
      type: 'text',
      required: true,

      hooks:{
        beforeChange:[
             ({data})=>{
            if(data?.name === 'Electro')
              data.name = 'Electric' 
            return data?.name
        },
        ({data})=>{
          if(data?.slug === 'electro'){
            data.slug = 'electric'
          }
          return data?.slug
        }
        ] 
      }
      
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
  ],
}
