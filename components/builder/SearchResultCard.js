import { useState } from 'react'
import Image from 'next/image'
import { getIconicTaxonPhoto } from '../../lib/taxa'
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

  if (!taxa.photo) {
    taxa.photo = { url: getIconicTaxonPhoto(taxa) }
  }

  const image = taxa.photo ?
      <img onLoad={()=>setLoaded(true)} className={styles.image} src={taxa.photo.url} alt={taxa.naming.taxon} />
    : <div className={styles.missingimage}>No photo</div>

  return (
    <>
      { loaded || <div style={{margin: "auto", textAlign: "center"}}> </div>}
    
      <div onClick={() => setParent({rank: taxa.naming.rank, id: taxa.id, name: taxa.naming.taxon})} className={[styles.card, loaded ? styles.loaded : ""].join(" ")}>

      <div className={styles.imagecontainer}>
        {image}
      </div>

      <div className={styles.label}>
        { taxa.id === 48460 ? "Browse kingdoms" : <>
          <span className={styles.common}>{taxa.naming.common_name?.replace(/[,]* and allies/i, ", ...") || ""}</span>
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
