import { type Endpoint, type PayloadRequest } from "payload";
import { getModels } from "../queries/getModels";

// Login endpoint for Payload CMS
export const modelEdnpoint: Endpoint = {
    path: "/model",
    method: "get",
    handler: async (req) => {
        const make = req?.data.make

        const rows = await getModels(make)
        return Response.json(rows)
          //return new Response('OK', { status: 200 })
    }
}
