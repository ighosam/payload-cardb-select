import { getName } from "./getName"
export const getExternalId = (row:any,entityType:string) =>{
const name = getName(row,entityType)

            switch(entityType){
              case 'make':
              case 'model':
              case 'bodyStyle':
              case 'powertrainType':
              case 'transmission':
              case 'drivetrain':
                //return row[`${entityType}_id`]
                return Buffer.from(`${name}`).toString("base64")
                 case 'trim':
                  return row[`${entityType}_id`]
              case 'powertrain':
                return `${row[entityType]}-${row['power']}:${row['engineDisplacement']}`
              case 'vehicle':
                return `${row['make']}-${row['model']}-${row['trim']}`
                
            }

}