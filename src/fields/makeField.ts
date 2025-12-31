import type {SelectFieldWithEndpoint} from '../../types' 
import type { SelectField } from 'payload'

export const makeField:SelectField = {
  name: 'make',
  type: 'select',
  label: 'Make',
  required: true,
  options: [], //initially empty
  admin:{
    //custom maker for front-end
  custom:{
   optionsEndpoint: 'api/cardb/makes' 
  }
 
  }
  
}
