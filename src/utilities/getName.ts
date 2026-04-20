export const getName = (row:any,entityType:string) =>{

            switch(entityType){
              case 'make':
              case 'model':
              case 'bodyStyle':
              case 'powertrainType':
              case 'transmission':
              case 'trim':
              case 'drivetrain':
                return row[entityType]
              case 'powertrain':
                return `${row[entityType]}:${row['power']}`
              case 'vehicle':
                return ''
            }

}