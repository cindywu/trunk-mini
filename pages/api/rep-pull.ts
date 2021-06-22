import { getDB } from '../../db'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const pull = req.body
  console.log(`Processing pull`, JSON.stringify(pull, null, ''))
  const t0 = Date.now()

  try {
    const db = await getDB()
    db.tx(async t => {
      const lastMutationID = parseInt(
        (
          await db.oneOrNone(
            'SELECT last_mutation_id FROM trunk_mini_replicache_client where id = $1',
            pull.clientID,
          )
        )?.last_mutation_id ?? '0',
      )
      const changed = await db.manyOrNone(
        'SELECT id, abbreviation, title, ord FROM trunk_mini WHERE version > $1',
        parseInt(pull.cookie ?? 0),
      )
      const cookie = (
        await db.one('SELECT max(version) AS verison FROM trunk_mini')
      ).version
      console.log({cookie, lastMutationID, changed})

      const patch = []
      if (pull.cookie === null) {
        patch.push({
          op: 'clear',
        })
      }

      patch.push(...changed.map(row => ({
        op: 'put',
        key: `ref/${row.id}`,
        value: {
          abbreviation: row.abbreviation,
          title: row.title,
          order: parseInt(row.ord),
        }
      })))

      res.json({
        lastMutationID,
        cookie,
        patch
      })
      res.end()
    })
  } catch (e) {
    console.error(e)
    res.status(500).send(e.toString())
  } finally {
    console.log('Processed pull in', Date.now() - t0)
  }
}
// // eslint-disable-next-line import/no-anonymous-default-export
// export default async (req: any, res: any) => {
//   res.json({
//     // We will discuss these two fields in later steps.
//     lastMutationID: 0,
//     cookie: null,
//     patch: [
//       {op: 'clear'},
//       {
//         op: 'put',
//         key: 'ref/e3969a75-813e-4d08-acee-b85b034f397c',
//         value: {
//           order: 1,
//           abbreviation: 'Baird 1986',
//           title: 'Upper cretaceous reptiles from the Severn Formation of Maryland',
//         },
//       },
//       {
//         op: 'put',
//         key: 'ref/936dc48f-36e4-46f5-8e0e-32fc72324487',
//         value: {
//           order: 2,
//           abbreviation: 'Baird and Galton 1981',
//           title: 'Pterosaur bones from the upper cretaceous of Delaware',
//         },
//       },
//     ],
//   })
//   res.end()
// }