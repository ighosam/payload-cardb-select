import type {SelectFieldWithEndpoint} from '../../types'
import type { SelectField } from 'payload'

export const modelField:SelectField = {
  name: 'model',
  type: 'select',
  required: true,
  options:[], //initially empty
  //depends on make
  admin:{
    //custom maker for front-end
  custom:{
   optionsEndpoint: '/api/cardb/models?make={make}'  
  }
 
  }
}
