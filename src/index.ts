import type { Plugin,Config} from "payload";
import { PluginOptions } from "../types";
import { vehicleGroupField } from "./fieldGroups/vehicleGroup";

export const payloadCarDbSelect = (options:PluginOptions):Plugin =>{
    return (incomingConfig):Config =>{

        return {  
            ...incomingConfig,
            collections:[
              ...(incomingConfig.collections || []).map(collection => {
          if (collection.slug !== options.slug) return collection
               return {
                ...collection,
                fields:[
                    ...collection.fields,
                    vehicleGroupField
                ],
                
               }


              })

            ]

        }
    }
}