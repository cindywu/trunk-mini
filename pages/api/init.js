import { getDB } from '../../db.js'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
  const db = await getDB()
  await db.task(async t => {
    await t.none('DROP TABLE IF EXISTS trunk_mini')
    await t.none('DROP TABLE IF EXISTS trunk_mini_replicache_client')
    await t.none('DROP SEQUENCE IF EXISTS version')
    await t.none(`CREATE TABLE trunk_mini (
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      abbreviation TEXT NOT NULL,
      title TEXT NOT NULL,
      ord BIGINT NOT NULL,
      version BIGINT NOT NULL)`)
    await t.none(`CREATE TABLE trunk_mini_replicache_client (
      id VARCHAR(36) PRIMARY KEY NOT NULL,
      last_mutation_id BIGINT NOT NULL)`)
    await t.none(`CREATE SEQUENCE version`)
  })
  res.send('ok')
}