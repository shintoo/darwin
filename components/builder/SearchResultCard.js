import { useState } from 'react'
import Image from 'next/image'
import styles from './SearchResultCard.module.css'

export default function SearchResultCard({ taxa, setParent, addNode }) {
  const [ loaded, setLoaded ] = useState(!taxa.photo)

  const nodeData = {
    "id": taxa.id,
    "common_name": taxa.naming.common_name,
    "sci_name": taxa.naming.rank + " " + taxa.naming.taxon,
    "icon": taxa.photo ? taxa.photo.url.replace("medium", "square") : "",
    "ancestors": taxa.ancestors,
    "wikipedia_url": taxa.wikipedia_url, 
  }

  const image = taxa.photo ?
      <img onLoad={()=>setLoaded(true)} className={styles.image} src={taxa.photo.url} alt={taxa.naming.taxon} />
    : <div className={styles.missingimage}>No photo</div>

  return (
    <>
      { loaded || <div style={{margin: "auto", textAlign: "center"}}>...</div>}
    
      <div onClick={() => setParent({id: taxa.id, name: taxa.naming.taxon})} className={[styles.card, loaded ? styles.loaded : ""].join(" ")}>

      <div className={styles.imagecontainer}>
        {image}
      </div>

      <div style={{fontWeight: taxa.id === 48460 ? "bold" : ""}} className={[styles.label, styles.bottom].join(" ")}>
        { taxa.id === 48460 ? "Browse kingdoms" : <>
          <span style={{fontWeight: "bold", display: "visible"}}>{taxa.naming.common_name || ""}</span>
          <div>
            <span className={styles.rank}>{taxa.naming.rank}</span> <br />
            <span className={styles.taxon}>{taxa.naming.taxon}</span>
          </div>
        </>}
        <span className={styles.clickhint}>(click to see children)</span>
      </div>

       {taxa.id !== 48460 &&
        <div onClick={e => {e.stopPropagation(); addNode(nodeData)}}  className={[styles.label, styles.addbutton].join(" ")}>
         +
        </div>} 
      </div>
    </>
  )
}
