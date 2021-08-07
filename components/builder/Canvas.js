import { useState, useEffect } from 'react'
import rd3 from 'react-d3-library'
import { createTree, updateTree} from '../../lib/tree'
import useWindowSize from '../../lib/window'
import styles from './Canvas.module.css'
const RD3Component = rd3.Component

export default function Canvas(props) {
  useEffect(() => { console.log("canvas effect doing updateTree"); updateTree(props.data) }, [props.data])
  const [ startCoords, setStartCoords ] = useState([0, 0])
  const [ dragging, setDragging ] = useState(false)
  const windowSize = useWindowSize()
  const [ coords, setCoords ] = useState([0, 0])

  if (typeof window === "undefined")
    return "loading..."

  const drag = e => {
    if (!dragging || !props.data[0].children) // Don't move a blank canvas
      return
    const delta = [e.clientX - startCoords[0], e.clientY - startCoords[1]]
    setCoords([coords[0] + delta[0]/15, coords[1] + delta[1]/15])
  }

  const node = createTree(
    props.deleteNode,
    coords[0],
    coords[1],
    windowSize.width,
    windowSize.height,
    props.count
  )

  if (!props.data[0].children)
    return null
  if (props.data[0].children.length === 1) {
    props.data[0].parent = "null"
    updateTree([props.data[0].children[0]])
  } else
    updateTree(props.data)

  return (
    <div
      onMouseDown={e => {setStartCoords([e.clientX, e.clientY]); setDragging(true)}}
      onMouseUp={_ => setDragging(false)}
      onMouseMove={e => drag(e)}
      onMouseLeave={_ => setDragging(false)}
      className={styles.canvas}>
        <RD3Component data={node} />
    </div>
  )
}

