import { type Endpoint, type PayloadRequest } from "payload";
import { getMakes } from "../queries/getMakes";

// Login endpoint for Payload CMS
export const makeEndpoint: Endpoint = {
    path: "/make",
    method: "get",
    handler: async () => {

        const rows = await getMakes()
        return Response.json(rows)
          //return new Response('OK', { status: 200 })
    }
}
