export const normalizeID = (value: any) =>
  value && typeof value === 'object' ? value.id : value;