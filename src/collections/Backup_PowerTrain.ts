import { CollectionConfig } from 'payload';

export const Powertrains: CollectionConfig =
{
  slug: 'powertrains',
  fields: [
    /*
    {
      name: 'name',
      type: 'select',
      required: true,
      options: [
        { label: 'Gasoline', value: 'gasoline' },
        { label: 'Diesel', value: 'diesel' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Electric', value: 'electric' },
      ], 
    },
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
    // 🔹 Raw data (from external DB)
    {
      name: 'powerRaw',
      type: 'number',
      required: true,
    },
    {
      name: 'powerUnit',
      type: 'select',
      options: ['hp', 'kwt'],
      required: true,
       admin: {
        readOnly: true,
      },
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
