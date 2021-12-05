import { useState, useEffect } from 'react'
import rd3 from 'react-d3-library'
import { createTree, updateTree} from '../../lib/tree'
import useWindowSize from '../../lib/window'
import styles from './Canvas.module.css'
const RD3Component = rd3.Component

export default function Canvas(props) {
  useEffect(() => { console.log("canvas effect doing updateTree"); updateTree(props.data, props.useCommonNames) }, [props.data])
  const [ startCoords, setStartCoords ] = useState([0, 0])
  const [ dragging, setDragging ] = useState(false)
  const windowSize = useWindowSize()
  const [ coords, setCoords ] = useState([0, 0])
  const [ i, setI ] = useState(0)
  console.log("canvas rerender - ", Date.now())
  if (typeof window === "undefined")
    return "loading..."

  const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
 
  if (startCoords[0] == startCoords[1] && startCoords[0] == 0 && coords[0] == 0) {
    setCoords([width/2, height/4])
  }

  const drag = e => {
    if (!dragging || !props.data[0].children) // Don't move a blank canvas
      return

    const delta = [e.clientX - startCoords[0], e.clientY - startCoords[1]]
    setCoords([coords[0] + delta[0], coords[1] + delta[1]])
    setStartCoords([e.clientX, e.clientY])
  }

  const node = createTree(
    id => { props.deleteNode(id); setI(i => i + 1); updateTree(props.data, props.useCommonNames);},
    coords[0],
    coords[1],
    width,
    height,
    props.scale,
    node => { props.expandNode(node); setI(i => i + 1);}
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
      onClick={e => {setStartCoords([e.clientX, e.clientY]); setDragging(true)}}
      onMouseUp={_ => setDragging(false)}
      onMouseMove={e => drag(e)}
      style={{cursor: dragging ? "grabbing" : "grab"}}
      onMouseLeave={_ => setDragging(false)}>
      { !props.data[0].children && <div className={styles.usagehint}><div>Browse or search taxa below and add them to the Canvas with the <span className={styles.plus}>+</span> button.</div></div> }

        <div id="tree-canvas" />
    </div>
  )
}

