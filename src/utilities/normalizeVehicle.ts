export function normalizeVehicle(input: string): string {
  if (!input) return ''
  let resp = input
  if(input.includes('Electro')){
    resp = input.replace("Electro","Electric")
  }


return resp
/*
 lower = input.toLowerCase().trim()
 console.warn(`input value is: ${lower}`)
  // Fallback: capitalize first letter
  return lower.charAt(0).toUpperCase() + lower.slice(1)
  */
}