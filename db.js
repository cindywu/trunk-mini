import pgInit from 'pg-promise'

const pgp = pgInit()
const db= pgp(process.env.TRUNK_MINI_DB_CONNECTION_STRING)

export async function getDB() {
  await db.connect()
  return db
}