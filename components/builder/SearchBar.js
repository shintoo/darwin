import { useState } from 'react'
import RankSelector from './RankSelector'
import styles from './SearchBar.module.css'
import debounce from '../../lib/input'

const updateSearchText = debounce((setter, text) => setter(text), 400)

export default function SearchBar(props) {
  const [ buffer, setBuffer ] = useState("")
  const placeholders = ["blue whale", "comb jelly", "primate", "butterfly", "gopher tortoise", "dandelion", "eagles", "sea urchin", "penguin", ]
  const [ placeholder, setPlaceholder ] = useState(placeholders[Math.floor(Math.random()*placeholders.length)] + "...")
  const handleChange = event => {
    event.preventDefault()
    setPlaceholder("")
    setBuffer(event.target.value)
    updateSearchText(props.setSearchText, event.target.value)
  }


  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        className={styles.input}
        value={buffer}
        placeholder={placeholder ? placeholder : "search..."}
        onClick={() => props.setHide(false)}
        onChange={handleChange} />
      <RankSelector setRank={props.setRank} />
    </div>
  )
}
