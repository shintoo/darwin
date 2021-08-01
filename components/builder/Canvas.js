import { useState, useEffect } from 'react'
import rd3 from 'react-d3-library'
import { createTree, updateTree} from '../../lib/tree'
import debounce from '../../lib/input'
const RD3Component = rd3.Component

export default function Canvas(props) {
  useEffect(() => updateTree(props.data), [props.data])
  const [ coords, setCoords ] = useState([0, 0])
  const [ startCoords, setStartCoords ] = useState([0, 0])
  const [ dragging, setDragging ] = useState(false)

  if (typeof window === "undefined")
    return "loading..."


  const drag = e => {
    if (!dragging)
      return
    const delta = [e.clientX - startCoords[0], e.clientY - startCoords[1]]
    setCoords([coords[0] + delta[0]/30, coords[1] + delta[1]/30])
  }

  const node = createTree(coords[0], coords[1])

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
      style={{position: "absolute", top: "100px"}}>
        <RD3Component data={node} />
    </div>
  )
}

