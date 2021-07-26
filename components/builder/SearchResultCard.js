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

  const nodeData = {
    "id": taxa.id,
    "name": taxa.naming.common_name ? taxa.naming.common_name : taxa.naming.taxon,
    "icon": taxa.photo ? taxa.photo.url.replace("medium", "square") : "",
    "ancestors": taxa.ancestors
  }

  const image = taxa.photo ?
      <img onLoad={()=>setLoaded(true)} className={styles.image} src={taxa.photo.url} alt={label} />
    : <div className={styles.missingimage}>No photo</div>

  return (
    <>
      { loaded || <div style={{margin: "auto", textAlign: "center"}}>...</div>}
    <div className={[styles.card, loaded ? styles.loaded : ""].join(" ")}>
      <div onClick={() => setParent({id: taxa.id, name: taxa.naming.taxon})} className={styles.imagecontainer}>
        {image}
      </div>
      <div onClick={() => addNode(nodeData)} style={{fontWeight: taxa.id === 48460 ? "bold" : ""}} className={styles.label}>
        {label}
      </div>
    </div>
    </>
  )
}
