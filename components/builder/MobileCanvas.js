import { useState, useEffect, useRef } from 'react'
import rd3 from 'react-d3-library'
import { createTree, updateTree } from '../../lib/tree'
import styles from './MobileCanvas.module.css'
const RD3Component = rd3.Component

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))
const touchDistance = touches => Math.hypot(
  touches[0].clientX - touches[1].clientX,
  touches[0].clientY - touches[1].clientY
)

// Touch-driven version of Canvas: one finger pans, two fingers pinch-to-zoom.
// Reuses the exact same D3 tree rendering (createTree/updateTree) as desktop.
export default function MobileCanvas(props) {
  useEffect(() => { updateTree(props.data, props.useCommonNames) }, [props.data])
  const [ coords, setCoords ] = useState([0, 0])
  // Transient gesture state kept in a ref so touch handlers don't re-render.
  const gesture = useRef({ dragging: false, last: [0, 0], pinchDist: null, pinchScale: 1 })

  if (typeof window === "undefined")
    return "loading..."

  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  if (coords[0] === 0 && coords[1] === 0) {
    setCoords([width/2, height/4])
  }

  const onTouchStart = e => {
    if (e.touches.length === 1) {
      gesture.current.dragging = true
      gesture.current.last = [e.touches[0].clientX, e.touches[0].clientY]
    } else if (e.touches.length === 2) {
      gesture.current.dragging = false
      gesture.current.pinchDist = touchDistance(e.touches)
      gesture.current.pinchScale = props.scale
    }
  }

  const onTouchMove = e => {
    if (!props.data[0].children) // Don't move a blank canvas
      return

    if (e.touches.length >= 2 && gesture.current.pinchDist) {
      const dist = touchDistance(e.touches)
      const ratio = dist / gesture.current.pinchDist
      props.setScale(clamp(gesture.current.pinchScale * ratio, 0.2, 4))
      return
    }

    if (e.touches.length === 1 && gesture.current.dragging) {
      const t = e.touches[0]
      const delta = [t.clientX - gesture.current.last[0], t.clientY - gesture.current.last[1]]
      setCoords(c => [c[0] + delta[0], c[1] + delta[1]])
      gesture.current.last = [t.clientX, t.clientY]
    }
  }

  const onTouchEnd = e => {
    if (e.touches.length === 0)
      gesture.current.dragging = false
    if (e.touches.length < 2)
      gesture.current.pinchDist = null
  }

  const node = createTree(
    props.deleteNode,
    coords[0],
    coords[1],
    width,
    height,
    props.scale
  )

  if (props.data[0].children) {
    if (props.data[0].children.length === 1) {
      props.data[0].parent = "null"
      updateTree([props.data[0].children[0]], props.useCommonNames)
    } else
      updateTree(props.data, props.useCommonNames)
  }

  return (
    <div
      className="mobile-canvas"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      { !props.data[0].children &&
        <div className={styles.usagehint}>
          <div>Browse or search taxa in the tray below, then drag one up here to add it to your tree.</div>
        </div>
      }
      <RD3Component data={node} />
    </div>
  )
}
