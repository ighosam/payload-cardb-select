export const getExternalId = (row:any,entityType:string) =>{

            switch(entityType){
              case 'make':
              case 'model':
              case 'bodyStyle':
              case 'powertrainType':
              case 'transmission':
              case 'trim':
              case 'drivetrain':
                return row[`${entityType}_id`]
              case 'powertrain':
                return `${row[entityType]}-${row['power']}:${row['engineDisplacement']}`
              case 'vehicle':
                return ''
                
            }

}