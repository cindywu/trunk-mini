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
        <h1>{value.abbreviation}</h1>
        <p>{value.title}</p>
        <div className={styles.uuid}>{id}</div>
      </a>
    </>
  )
}
