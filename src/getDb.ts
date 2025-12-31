import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

let db: Database | null = null

export const getDB = async (): Promise<Database> => {
  if (db) return db

  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  db = await open({
    filename: path.join(__dirname, '../cardb.db'),
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })

  return db
}
