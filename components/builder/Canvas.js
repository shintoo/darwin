import { useEffect } from 'react'
import rd3 from 'react-d3-library'
import { createTree, updateTree} from '../../lib/tree'
const RD3Component = rd3.Component

export default function Canvas(props) {
  useEffect(() => updateTree(props.data), [props.data])
  if (typeof window !== "undefined") {
    const node = createTree()
    updateTree(props.data)
    return <div style={{position: "absolute", top: "100px"}}><RD3Component data={node} /></div>
  }
  return "loading..."
}
