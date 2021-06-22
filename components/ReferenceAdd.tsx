import React, { useRef } from 'react'
import styles from '../styles/ReferenceAdd.module.css'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  references: any
  handleReferenceAddClick: () => void
  handleReferenceAdd: (reference: any) => void
}

export default function ReferenceAdd({ references, handleReferenceAddClick, handleReferenceAdd } : Props) {

  const abbreviationRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  function handleSaveReference(){
    console.log(' i am in handle save reference')
    const newReference = {
      id: uuidv4(),
      order: references.length + 1,
      abbreviation: abbreviationRef.current ? abbreviationRef.current.value : '',
      title: titleRef.current ? titleRef.current.value : '',
    }
    handleReferenceAdd(newReference)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.btnContainer}>
          {/* <button>Expand</button> */}
          <button
            className={styles.btnSecondary}
            onClick={handleReferenceAddClick}
          >&times;</button>
        </div>
        <div>

        </div>
        <div>REF-{references.length + 1} &rarr;</div>
        <div>
          <h2>
            <input
              type="text"
              autoComplete="off"
              name="abbreviation"
              id={styles.abbreviation}
              className={styles.input}
              placeholder="Baird and Galton 1981"
              ref={abbreviationRef}
            />
          </h2>
        </div>
        <div>
          <input
            type="text"
            autoComplete="off"
            name="name"
            id={styles.name}
            className={styles.input}
            placeholder="Pterosaur bones from the upper cretaceous of Delaware"
            ref={titleRef}
          />
        </div>
        <div className={styles.btn}>
          <button
            className={styles.btnSecondary}
            onClick={() => handleSaveReference()}
          >Add reference</button>
        </div>
      </div>
    </div>
  )
}
