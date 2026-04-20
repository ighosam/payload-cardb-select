
export const buildSlug = (value: string): string  =>{
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const buildUniqueSlug = (base: string, existingSlugs: Set<string>) => {
  let slug = buildSlug(base)

  if (!existingSlugs.has(slug)) return slug

  let counter = 2
  while (existingSlugs.has(`${slug}-${counter}`)) {
    counter++
  }

  return `${slug}-${counter}`
}