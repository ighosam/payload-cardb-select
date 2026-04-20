import { type Endpoint } from "payload";
import { syncCars } from "../sync/syncCars";
//import { carDB } from "../car-db";

// Login endpoint for Payload CMS
export const syncCarsEndpoint: Endpoint = {
       path: '/car-sync/run',
       method: 'post',
        handler: async (req)=>{
             await syncCars(req.payload);
            return Response.json({ message: 'Car sync completed' },{status:200})
        }
}