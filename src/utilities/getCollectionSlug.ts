
/*
   * -----------------------------------------
   *    This code return requested lagacy data
   * ------------------------------------------
*/ 
export const getCollectionSlug = (entityType:string) =>{

    switch(entityType){

        case "make":
            return 'car-makes'
        case "model":
            return 'car-models'
        case "bodyStyle": 
            return 'body-styles'
        case 'trim':
            return 'car-trims'
        case 'generation':
            return ''
        case 'engine':
            return ''
        case 'powertrain':
            return 'powertrains'
        case 'powertrainType':
            return 'powertrainTypes'
        case 'vehicleConfiguration':
            return ''
        case 'drivetrain':
            return 'drive-trains'
        case 'transmission':
            return 'transmissions'
            ///////////////////////
        
    }

}