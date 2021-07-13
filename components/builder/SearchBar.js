import { useState } from 'react'
import styles from './SearchBar.module.css'
import debounce from '../../lib/input'

const updateSearchText = debounce((setter, text) => setter(text), 400)

export default function SearchBar(props) {
  const [ buffer, setBuffer ] = useState("")
  const handleChange = event => {
    event.preventDefault()
    setBuffer(event.target.value)
    updateSearchText(props.setSearchText, event.target.value)
  }

  return (
    <>
      <input
        type="text"
        className={styles.searchbar}
        value={buffer}
        onClick={() => props.setHide(false)}
        onChange={handleChange} />

    </>
  )
}
