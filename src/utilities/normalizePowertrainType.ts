
export function normalizePowertrainType(input: string): string {
  if (!input) return ''

  console.warn(`input value is: ${input}`)

  let lower = ''

 lower = input.toLowerCase().trim()

  
  // Fallback: capitalize first letter
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}