import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { getIconicTaxonPhoto } from '../../lib/taxa'
import styles from './SearchResultCard.module.css'

export default function SearchResultCard({ taxa, setParent, addNode, mobileDrag }) {
  const [ loaded, setLoaded ] = useState(!taxa.photo)
  const cardRef = useRef(null)
  // Transient drag state for the mobile drag-to-add gesture.
  const drag = useRef({ startX: 0, startY: 0, active: false, dragged: false, ghost: null })

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

  // Keep the latest values available to the native touch handlers, which are
  // bound once and would otherwise close over stale props.
  const latest = useRef({})
  latest.current = { addNode, nodeData, photoUrl: taxa.photo?.url }

  // On mobile there's no hover to reveal the "+" button, so instead let the
  // user drag a taxon up out of the dock and drop it onto the canvas to add it.
  // A tap (no drag) still drills into the taxon's children as before.
  useEffect(() => {
    if (!mobileDrag) return
    const el = cardRef.current
    if (!el) return

    const clearGhost = () => {
      if (drag.current.ghost) {
        drag.current.ghost.remove()
        drag.current.ghost = null
      }
    }

    const onStart = e => {
      const t = e.touches[0]
      drag.current.startX = t.clientX
      drag.current.startY = t.clientY
      drag.current.active = false
      drag.current.dragged = false
    }

    const onMove = e => {
      const t = e.touches[0]

      if (!drag.current.active) {
        const dx = t.clientX - drag.current.startX
        const dy = t.clientY - drag.current.startY
        // Only claim the gesture once it's clearly an upward drag; otherwise
        // leave it to the browser so horizontal swipes scroll the dock.
        if (dy < -12 && Math.abs(dy) > Math.abs(dx)) {
          drag.current.active = true
          drag.current.dragged = true
          const ghost = document.createElement('div')
          ghost.className = styles.dragghost
          if (latest.current.photoUrl)
            ghost.style.backgroundImage = `url("${latest.current.photoUrl}")`
          document.body.appendChild(ghost)
          drag.current.ghost = ghost
        } else {
          return
        }
      }

      // We've committed to a drag: stop the dock from scrolling and move the ghost.
      e.preventDefault()
      const g = drag.current.ghost
      if (g) {
        g.style.left = t.clientX + 'px'
        g.style.top = t.clientY + 'px'
      }
    }

    const onEnd = e => {
      if (!drag.current.active) return
      const t = e.changedTouches[0]
      clearGhost()
      drag.current.active = false
      // Prevent the synthesized click (which would drill into children).
      e.preventDefault()

      const dock = el.closest('[data-mobile-dock]')
      const dockTop = dock ? dock.getBoundingClientRect().top : window.innerHeight
      // Dropped above the dock, i.e. over the canvas -> add it to the tree.
      if (t.clientY < dockTop - 8) {
        latest.current.addNode(latest.current.nodeData)
      }
    }

    const onCancel = () => {
      clearGhost()
      drag.current.active = false
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: false })
    el.addEventListener('touchcancel', onCancel, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onCancel)
      clearGhost()
    }
  }, [mobileDrag])

  const image = taxa.photo ?
      <img onLoad={()=>setLoaded(true)} className={styles.image} src={taxa.photo.url} alt={taxa.naming.taxon} />
    : <div className={styles.missingimage}>No photo</div>

  const handleCardClick = () => {
    // Swallow the click that ends a drag so it doesn't also drill into children.
    if (drag.current.dragged) {
      drag.current.dragged = false
      return
    }
    setParent({rank: taxa.naming.rank, id: taxa.id, name: taxa.naming.taxon})
  }

  return (
    <>
      { loaded || <div style={{margin: "auto", textAlign: "center"}}> </div>}

      <div ref={cardRef} onClick={handleCardClick} className={[styles.card, loaded ? styles.loaded : "", mobileDrag ? styles.mobileCard : ""].join(" ")}>

      <div className={styles.imagecontainer}>
        {image}
      </div>

      { mobileDrag ?
        <div className={styles.mobilecaption}>
          { taxa.id === 48460 ? "kingdoms" : (taxa.naming.common_name?.replace(/[,]* and allies/i, ", ...") || taxa.naming.taxon) }
        </div>
      :
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
      }

       {taxa.id !== 48460 && !mobileDrag &&
        <div onClick={e => {e.stopPropagation(); addNode(nodeData)}}  className={[styles.label, styles.addbutton].join(" ")}>
         +
        </div>}
      </div>
    </>
  )
}
