// utilities/normalizeBodyStyleName.ts

const CANONICAL_MAP: Record<string, string> = {
  sedan: 'Sedan',
  saloon: 'Sedan',

  hatchback: 'Hatchback',

  coupe: 'Coupe',

  convertible: 'Convertible',
  cabriolet: 'Convertible',

  wagon: 'Wagon',
  estate: 'Wagon',

  suv: 'SUV',
  'sport utility': 'SUV',
  'sport utility vehicle': 'SUV',
  crossover: 'SUV',
  'crossover utility': 'SUV',
  cuv: 'SUV',

  pickup: 'Pickup',
  'pickup truck': 'Pickup',
  truck: 'Pickup',

  van: 'Van',

  mpv: 'MPV',
  'multi purpose vehicle': 'MPV',
}

export function normalizeBodyStyleName(input: string): string {
  if (!input) return ''
  
  const lower = input.toLowerCase().trim()

  // Try direct match
  if (CANONICAL_MAP[lower]) {
    return CANONICAL_MAP[lower]
  }

  // Try partial match
  for (const key of Object.keys(CANONICAL_MAP)) {
    if (lower.includes(key)) {
      return CANONICAL_MAP[key]
    }
  }

  // Fallback: capitalize first letter
  //return lower.charAt(0).toUpperCase() + lower.slice(1)
  return ''
}