import type { FieldHook } from 'payload'

export const validateVehicleYear: FieldHook = async ({
  value,
  siblingData,
  req,
}) => {
  // no year entered → let required handle it
  if (value == null) return value

  const { model, trim } = siblingData

  let source: any = null

  try {
    // Prefer trim
    if (trim) {
      source = await req.payload.findByID({
        collection: 'trims',
        id: trim,
      })
    } else if (model) {
      source = await req.payload.findByID({
        collection: 'models',
        id: model,
      })
    }

    // If no source, skip validation
    if (!source) return value

    const { startYear, endYear } = source

    // Ensure bounds exist
    if (
      typeof startYear !== 'number' ||
      typeof endYear !== 'number'
    ) {
      return value
    }

    if (value < startYear || value > endYear) {
      throw new Error(
        `Year must be between ${startYear} and ${endYear}`
      )
    }

    return value
  } catch (err) {
    // Optional: log for debugging
    console.error('Year validation error:', err)
    throw err
  }
}