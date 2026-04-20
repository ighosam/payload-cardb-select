
   export const mapDrive = (dr:string)=>{
          if(dr.includes('Part Time')) 
          return 'Four-wheel Drive Selectable (4WD)'
          if(dr.includes('Full Time') || dr.includes('AWD'))
            return 'All-wheel Drive (AWD)'
          if(dr.includes('4WD'))
            return 'Four-wheel Drive (4WD)'
          if(dr.includes('RWD'))
            return 'Rear-wheel Drive (RWD)'
          if(dr.includes('FWD'))
            return 'Front-wheel Drive (FWD)'
          
          //if(dr.includes('Unknown')) 
            return 'Not Stated'
         }