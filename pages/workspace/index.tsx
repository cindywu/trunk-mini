import React, { useState, useEffect } from 'react'
import styles from '../../styles/Workspace.module.css'

import ReferenceAdd from '../../components/ReferenceAdd'
import ReferenceGrid from '../../components/ReferenceGrid'

import { Replicache } from 'replicache'

import Pusher from 'pusher-js'


export default function Workspace() {
  const [rep, setRep] = useState<any>(null)
  const [references, setReferences] = useState()

  useEffect(() => {
    (async () => {
      const rep = new Replicache({
        pushURL: '/api/rep-push',
        pullURL: '/api/rep-pull',
        wasmModule: 'replicache.dev.wasm',
        mutators: {
          async createReference(tx, {id, order, abbreviation, title}) {
            await tx.put(`ref/${id}`, {
              order,
              abbreviation,
              title
            })
          }
        }
      })
      const d = await rep
      listen(rep)
      setRep(d)
    })()
  }, [])

  function listen(rep: any) {
    console.log('listening')
    // Listen for pokes, and pull whenever we get one.
    Pusher.logToConsole = true
    const pusher = new Pusher(process.env.NEXT_PUBLIC_TRUNK_MINI_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_TRUNK_MINI_PUSHER_CLUSTER,
    })
    const channel = pusher.subscribe('default')
    channel.bind('poke', () => {
      console.log('got poked')
      rep.pull()
    })

  }

  return rep && <ReferenceGrid rep={rep} />

  // return (
  //   <div className={styles.container}>
  //     {/* <ReferenceAdd /> */}
  //     <div className={styles.btnContainer}><button className={styles.btn}>+</button></div>
  //     <ReferenceGrid references={keyValueReferences}/>
  //   </div>
  // )
}

const keyValueReferences = [
  {'e3969a75-813e-4d08-acee-b85b034f397c':
    {
      order: 1,
      abbreviation: 'Baird 1986',
      title: 'Upper cretaceous reptiles from the Severn Formation of Maryland',
    }
  },
  {'936dc48f-36e4-46f5-8e0e-32fc72324487':
    {
      order: 2,
      abbreviation: 'Baird and Galton 1981',
      title: 'Pterosaur bones from the upper cretaceous of Delaware',
    }
  },
  {'54c6282a-25c2-4b92-910d-306da42b8892':
    {
      order: 3,
      abbreviation: 'Becker et al. 2006',
      title: 'The first record of catfish from the Late Cretaceous/Early Tertiary of New Jersey',
    }
  },
  {'c63047e1-9854-422d-9544-439b246090ad':
    {
      order: 4,
      abbreviation: 'Braudy et al. 2009',
      title: 'A late cretaceous faunal assemblage at Rancocas, New Jersey: biostratigraphic implications',
    }
  },
  {'e42ff89e-3a3b-4ebf-8766-c3b3d60f54a7':
    {
      order: 5,
      abbreviation: 'Graham 2021',
      title: 'Write simply',
    }
  },
  {'6a41cc84-6c33-43ef-9928-9d832479bd81':
    {
      order: 6,
      abbreviation: 'Graham 2021',
      title: 'Crazy new ideas',
    }
  },
  {'183eb0d3-310b-4471-a52e-aa3aa90553ef':
    {
      order: 7,
      abbreviation: 'Jarret 2018',
      title: 'Brine Trust',
    }
  },
]

const sampleReferences = [
  {
    id: 'e3969a75-813e-4d08-acee-b85b034f397c',
    order: 1,
    abbreviation: 'Baird 1986',
    title: 'Upper cretaceous reptiles from the Severn Formation of Maryland',
  },
  {
    id: '936dc48f-36e4-46f5-8e0e-32fc72324487',
    order: 2,
    abbreviation: 'Baird and Galton 1981',
    title: 'Pterosaur bones from the upper cretaceous of Delaware',
  },
  {
    id: '54c6282a-25c2-4b92-910d-306da42b8892',
    order: 3,
    abbreviation: 'Becker et al. 2006',
    title: 'The first record of catfish from the Late Cretaceous/Early Tertiary of New Jersey',
  },
  {
    id: 'c63047e1-9854-422d-9544-439b246090ad',
    order: 4,
    abbreviation: 'Braudy et al. 2009',
    title: 'A late cretaceous faunal assemblage at Rancocas, New Jersey: biostratigraphic implications',
  },
  {
    id: 'e42ff89e-3a3b-4ebf-8766-c3b3d60f54a7',
    order: 5,
    abbreviation: 'Graham 2021',
    title: 'Write simply',
  },
  {
    id: '6a41cc84-6c33-43ef-9928-9d832479bd81',
    order: 6,
    abbreviation: 'Graham 2021',
    title: 'Crazy new ideas',
  },
  {
    id: '183eb0d3-310b-4471-a52e-aa3aa90553ef',
    order: 7,
    abbreviation: 'Jarret 2018',
    title: 'Brine Trust',
  },
]
