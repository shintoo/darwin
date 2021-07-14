import { useState } from 'react'
import Image from 'next/image'
import styles from './SearchResultCard.module.css'

export default function SearchResultCard({ taxa, setParent, addNode }) {
  const [ loaded, setLoaded ] = useState(!taxa.photo)
  let label = ""
  if (taxa.id === 48460)
    label = "Browse kingdoms"
  else {
    if (taxa.naming.common_name) {
       label += taxa.naming.common_name
    }

    label += " (" + taxa.naming.rank + " " + taxa.naming.taxon + ")"
  }

  const image = taxa.photo ?
      <img onLoad={()=>setLoaded(true)} className={styles.image} src={taxa.photo.url} alt={label} />
    : <div className={styles.missingimage}>No photo</div>

  return (
    <>
      { loaded || <div style={{margin: "auto", textAlign: "center"}}>...</div>}
    <div className={[styles.card, loaded ? styles.loaded : ""].join(" ")} onClick={() => setParent({id: taxa.id, name: taxa.naming.taxon})}>
      <div className={styles.imagecontainer}>
        {image}
      </div>
      <div onClick={() => addNode({"parent": "meme", "id": "4", "level": "red", "name": label, "icon": taxa.photo.url.replace("medium", "square"), children: []})} style={{fontWeight: taxa.id === 48460 ? "bold" : ""}} className={styles.label}>
        {label}
      </div>
    </div>
    </>
  )
}
