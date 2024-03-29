import { useState } from "react"
import styles from "./Title.module.css"

export default function Title({ title, setTitle }) {
  const [ editing, setEditing ] = useState(false)

  const handleChange = event => {
    setTitle(event.target.value)
  }

  const handleKeyUp = event => {
    if (event.key === "Enter") {
      setEditing(false)
    }
  }

  if (!editing) {
    return (
      <div className={styles.title} onClick={() => setEditing(true)}>
        {title.length === 0 ? "Untitled" : title }
      </div>
    )
  }

  return (
    <input
        className={styles.input}
        type="text"
        autoFocus
        placeholder="title"
        value={title}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
       onBlur={_ => setEditing(false)}
    />
  )
}
