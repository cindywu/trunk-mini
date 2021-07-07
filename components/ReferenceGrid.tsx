import React, { useState } from 'react'
import styles from '../styles/ReferenceGrid.module.css'
import Reference from './Reference'
import { useSubscribe } from '../utils/useSubscribe'
import ReferenceAdd from './ReferenceAdd'

type Props = {
  rep: any
  onDelete: (id: string) => void
}

export default function ReferenceGrid({ rep, onDelete} : Props) {
  const [showReferenceAdd, setShowReferenceAdd] = useState(false)
  const references = useSubscribe(
    rep,
    async tx => {
      const list = await tx.scan({prefix: 'ref/'}).entries().toArray()
      // list.sort(([, {order: a}], [, {order: b}]) => a - b)
      return list
    },
    [],
  )

  console.log('referenes', references)

  function handleReferenceAddClick() {
    setShowReferenceAdd(!showReferenceAdd)
  }

  function handleReferenceAdd(reference: any) {
    rep.mutate.createReference({
      id: reference.id,
      order: reference.order,
      abbreviation: reference.abbreviation,
      title: reference.title
    })
    console.log('i am here')
    setShowReferenceAdd(!showReferenceAdd)
  }


  return (
    <div className={styles.container}>
      {showReferenceAdd && <ReferenceAdd references={references} handleReferenceAddClick={handleReferenceAddClick} handleReferenceAdd={handleReferenceAdd}/>}
      <div className={styles.btnContainer}>
        <button
          className={styles.btnSecondary}
          onClick={handleReferenceAddClick}
        >+</button>
        </div>
      <div className={styles.grid}>
        {references.map (([k, v]) => {
          return (
            <Reference key={k} id={k} value={v} onDelete={onDelete}/>
          )
        })}
        {/* <a href="https://nextjs.org/docs" className={styles.card}>
          <div>REF-1 &rarr;</div>
          <h1>Baird 1986</h1>
          <p>Upper cretaceous reptiles from the Severn Formation of Maryland</p>
        </a>

        <a href="https://nextjs.org/learn" className={styles.card}>
          <div>REF-2 &rarr;</div>
          <h1>Baird and Galton 1981</h1>
          <p>Pterosaur bones from the upper cretaceous of Delaware</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className={styles.card}
        >
          <div>REF-3 &rarr;</div>
          <h1>Becker et al. 2006</h1>
          <p>The first record of catfish from the Late Cretaceous/Early Tertiary of New Jersey</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <div>REF-4 &rarr;</div>
          <h1>Braudy et al. 2009</h1>
          <p>
          A late cretaceous faunal assemblage at Rancocas, New Jersey: biostratigraphic implications
          </p>
        </a>
        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <div>REF-5 &rarr;</div>
          <h1>Graham 2021</h1>
          <p>
          Write simply
          </p>
        </a>
        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <div>REF-6 &rarr;</div>
          <h1>Graham 2021</h1>
          <p>
          Crazy new ideas
          </p>
        </a> */}
      </div>

    </div>
  )
}
