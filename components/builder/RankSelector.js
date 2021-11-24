import { useState } from 'react'
import debounce from '../../lib/input'
import styles from './RankSelector.module.css'

const updateRank = debounce((setter, value) => setter(value), 300)

export default function RankSelector(props) {
  const [ rank, setRank ] = useState("")

  const handleSelect = (event) => {
    setRank(event.target.value)
    props.setHide(false)
    updateRank(props.setRank, event.target.value)
  }

  const ranks = [
      "kingdom",
      "phylum",
      "subphylum",
      "superclass",
      "class",
      "subclass",
      "superorder",
      "order",
      "suborder",
      "infraorder",
      "superfamily",
      "epifamily",
      "family",
      "subfamily",
      "supertribe",
      "tribe",
      "subtribe",
      "genus",
      "genushybrid",
      "species",
      "hybrid",
      "subspecies",
      "variety",
      "form",
  ]

  const options = ranks.map((val, i) => <option key={i} value={val}>{val}</option>)

  return (
    <select className={styles.rankselector} value={rank} onChange={handleSelect}>
      <option value="">select a rank...</option>
      {options}
    </select>
  )
}
