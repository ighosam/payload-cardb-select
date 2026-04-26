export function normalizeTrim(input: string): string {
  let res = String(input)
  
 if(typeof(input) === 'string'){
   return input.length ? input : 'Base'
  }

return res
}