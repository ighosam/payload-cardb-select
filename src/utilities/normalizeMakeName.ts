const LEGAL_SUFFIXES = [
  'inc',
  'inc.',
  'ltd',
  'ltd.',
  'limited',
  'corp',
  'corp.',
  'corporation',
  'co',
  'co.',
  'company'
]

export function normalizeMakeName(name: string): string {
  if (!name) return ''

  let value = name.toLowerCase().trim()

  // remove punctuation except &
  value = value.replace(/[.,]/g, '')

  // remove legal suffix ONLY if at end
  for (const suffix of LEGAL_SUFFIXES) {
    const escaped = suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\s+${escaped}$`, 'i')
    value = value.replace(regex, '')
  }

  // normalize whitespace
  value = value.replace(/\s+/g, ' ').trim()

  return value
}