import { getDB } from '../getDb'

export const getModels = async (make: string): Promise<string[]> => {
  const db = await getDB()

  const rows = await db.all(
    `SELECT DISTINCT model
     FROM cardb
     WHERE make = @make`,
    { '@make': make }
  )

  return rows.map(r => r.model)
}
