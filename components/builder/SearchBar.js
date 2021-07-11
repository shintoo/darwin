import { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar(props) {
  const [ buffer, setBuffer ] = useState("")

  const handleChange = event => {
    event.preventDefault()
    setBuffer(event.target.value)
    props.setSearchText(event.target.value)
  }

  return (
    <>
      <input
        type="text"
        className={styles.searchbar}
        value={buffer}
        onChange={handleChange} />

    </>
  )
}
