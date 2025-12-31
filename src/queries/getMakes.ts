import { getDB } from '../getDb'

export const getMakes = async (): Promise<string[]> => {
  const db = await getDB()

  const rows = await db.all(
    `SELECT DISTINCT make
     FROM cardb`,   
  )

  return rows.map(r => r.make)
}
