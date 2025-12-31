import type { Plugin,Config} from "payload";
import { CarDbEnpoint } from "./collections/cardb";

export const payloadCarDbSelect = ():Plugin =>{
    return (incomingConfig):Config =>{

        return {  
            ...incomingConfig,
            collections:[
             ...(incomingConfig.collections ?? []),
             CarDbEnpoint
            ]
        }
    }
}