import { useState } from 'react'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'
import RankSelector from './RankSelector'
import ParentMeme from './ParentMeme'
import Canvas from './Canvas'
import styles from './Builder.module.css'

export default function Builder(props) {
  const [ searchText, setSearchText ] = useState("")
  const [ searchRank, setSearchRank ] = useState("")
  const [ searchParent, setSearchParent ] = useState(null)
  const [ bottomUiHidden, setBottomUiHidden ] = useState(false)
  const [ treeData, setTreeData ] = useState(
    [
      {"name": "Birds", "id": 1337,  "parent": "null",
       "children": [
         {"name": "Typical owls", "id": 1338, "parent": "Birds", "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/22450048/medium.jpg?1533201251"},
         {"name": "Perching birds", "id": 199199199, "parent": "Birds", "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/13159622/square.jpg?1545710920",
          "children": [
            {"name": "Thrushes", "id": 109109109, "parent": "Perching birds", "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/1799195/square.jpg?1545604825"},
            {"name": "New world warblers", "id": 209209209, "parent": "Perching birds", "icon": "https://static.inaturalist.org/photos/5809085/medium.jpg?1481677507"}
          ]}
       ],
       "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/222/square.jpg?155397324"}
    ]
  )
  const [ usedIds, setUsedIds ] = useState([])

  const addNode = data => {
    if (usedIds.includes(data.id))
      return
    const nodeData = {...data, "parent": "meme", "children": [], "level": "green"}

    if (!treeData[0].children)
      treeData[0].children = [nodeData]
    else
      treeData[0].children.push(nodeData)

    setUsedIds([...usedIds, data.id])
    setTreeData([])
    setTreeData(treeData)
  }

  return (
    <div>
      <div>
        <Canvas data={treeData} />
      </div>
      <div className={[styles.uibottom, bottomUiHidden ? styles.hidden : ""].join(" ")}>
        <SearchBar setHide={setBottomUiHidden} setSearchText={setSearchText} />
        <ParentMeme parent={searchParent && searchParent.name} setParent={setSearchParent} />
        <RankSelector setHide={setBottomUiHidden} setRank={setSearchRank} /> 
        <span onClick={() => setBottomUiHidden(!bottomUiHidden)}> {bottomUiHidden? "^" : "v"}</span>
        <SearchResultBox
          query={searchText}
          rank={searchRank}
          parent={searchParent && searchParent.id}
          setParent={setSearchParent}
          addNode={addNode}/>
      </div>
    </div>
  )
}
