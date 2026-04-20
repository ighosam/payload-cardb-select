const mapDrive = (dr:string)=>{
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
export function normalizeDrivetrain(input: string): string {
  if (!input) return ''

  let lower = mapDrive(input)
return lower
/*
 lower = input.toLowerCase().trim()
 console.warn(`input value is: ${lower}`)
  // Fallback: capitalize first letter
  return lower.charAt(0).toUpperCase() + lower.slice(1)
  */
}