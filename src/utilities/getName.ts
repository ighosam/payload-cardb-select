import { getNormalizer } from "./getNormalizer";
export const getName = (row:any,entityType:string) =>{

  const stringToHex = (str: string): string => {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}
    const nomalizer = getNormalizer(entityType) as (name:string)=> string
            
    switch(entityType){
              case 'make':
              case 'model':
              case 'bodyStyle':
              case 'powertrainType':
              case 'transmission':
              case 'drivetrain':
                return nomalizer(row[entityType])
              case 'trim':
                const name = `${nomalizer(row[entityType])}_${Buffer.from(`${row[entityType]}`).toString("base64")}`
                return name
              case 'powertrain':
                return nomalizer(`${row[entityType]}:${row['power']}_${row['engineDisplacement']}`)
              case 'vehicle':
                return nomalizer(`${row['trim']}_${row['make']}_${row['model']}_${row['generation']}:${row['year']}`)
               case 'yearTrim':
                return nomalizer(`${row['year']}`)
             
            }
}