// utilities/normalizeModelName.ts

const MARKETING_NOISE = [
  'all new',
  'all-new',
  'new',
  'the',
]

const BODY_STYLE_WORDS = [
  'sedan',
  'saloon',
  'hatchback',
  'coupe',
  'convertible',
  'wagon',
  'estate',
  'suv',
  'crossover',
  'mpv',
  'van',
]

export function normalizeModelName(input: string): string {
  if (!input) return ''

  let name = input.toLowerCase().trim()

  // Remove marketing noise
  MARKETING_NOISE.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    name = name.replace(regex, '')
  })

  // Remove body style words (since style is separate relation)
  BODY_STYLE_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    name = name.replace(regex, '')
  })

  // Normalize spacing
  name = name.replace(/\s+/g, ' ').trim()

  // Preserve hyphenated formats like F-150
  // Capitalize correctly:
  name = name
    .split(' ')
    .map(word => {
      // Preserve patterns like "3-series" or "f-150"
      if (word.includes('-')) {
        return word
          .split('-')
          .map(part =>
            part.length > 0
              ? part.charAt(0).toUpperCase() + part.slice(1)
              : part
          )
          .join('-')
      }

      // Normal word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

  return name
}