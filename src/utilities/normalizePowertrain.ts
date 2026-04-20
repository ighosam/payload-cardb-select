export function normalizePowertrain(input: string): string {
  if (!input) return ''
console.warn(`Name is ${input}`)


 if(typeof(input) !== 'string') return input

  let suffex = input.split(':')[1]
  let lower = input.split(':')[0]

 //lower = input.toLowerCase().trim()

 
  // Fallback: capitalize first letter
  return lower.charAt(0).toUpperCase() + lower.slice(1)+suffex
}