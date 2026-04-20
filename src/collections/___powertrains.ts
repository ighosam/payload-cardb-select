import { CollectionConfig } from 'payload';

export const Powertrains: CollectionConfig = {
  slug: 'powertrains',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'ICE', value: 'ice' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Plug-in Hybrid', value: 'phev' },
        { label: 'Electric', value: 'ev' },
      ],
    },

    // Optional combustion engine
    {
      name: 'engine',
      type: 'relationship',
      relationTo: 'engines',
      required: false,
    },

    // Optional EV / hybrid info
    {
      name: 'batteryKWh',
      type: 'number',
      required: false,
      admin: {
        description: 'Battery capacity in kWh (EV / PHEV)',
      },
    },

    {
      name: 'title',
      type: 'text',
      admin: { readOnly: true },
      hooks: {
        beforeValidate: [
          async ({ data, req }:any) => {
            const parts: string[] = [];

            if (data.type) parts.push(data.type.toUpperCase());

            if (data.engine) {
              const engine = await req.payload.findByID({
                collection: 'engines',
                id: data.engine,
              });

              if (engine?.displacement) {
                parts.push(`${engine.displacement}L`);
              }

              if (engine?.configuration) {
                parts.push(engine.configuration);
              }
            }

            if (data.batteryKWh) {
              parts.push(`${data.batteryKWh}kWh`);
            }

            data.title = parts.join(' ');
            return data;
          },
        ],
      },
    },
  ],
};
