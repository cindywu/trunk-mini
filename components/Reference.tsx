import React from 'react'
import styles from '../styles/ReferenceGrid.module.css'

type Props = {
  id: any
  value: any
}

export default function Reference({ id, value }: Props) {
  return (
    <>
      <a href="https://nextjs.org/docs" className={styles.card}>
        <div>REF-{value.order} &rarr;</div>
        {value.abbreviation ?
         <h1>{value.abbreviation}</h1>
        : <h1 className={styles.placeholder}>Untitled</h1>
        }
        {value.title ?
          <p>{value.title}</p>
        :
          <p className={styles.placeholder}>Untitled</p>
        }

        <div className={styles.uuid}>{id}</div>
      </a>
    </>
  )
}
