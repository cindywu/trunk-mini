import React from 'react'
import styles from '../styles/ReferenceGrid.module.css'

type IReference = {
  order: number
  abbreviation: string
  title: string
}

type Props = {
  k: any
  value: IReference
}

export default function Reference({ value }: Props) {
  return (
    <>
      <a href="https://nextjs.org/docs" className={styles.card}>
        <div>REF-{value.order} &rarr;</div>
        <h1>{value.abbreviation}</h1>
        <p>{value.title}</p>
      </a>
    </>
  )
}
