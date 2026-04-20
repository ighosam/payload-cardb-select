// utils/slugify.ts
/*
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // remove invalid chars
    .replace(/\s+/g, '-')          // replace spaces with dash
    .replace(/-+/g, '-')           // collapse multiple dashes
}
*/
//////////////////////////////////////

export function slugify(value: string) {
  if(typeof(value)==='string'){
     return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')   // replace invalid chars with dash
    .replace(/-+/g, '-')           // collapse multiple dashes
    .replace(/(^-|-$)/g, '')       // remove leading OR trailing dash
  }
  return value
}

