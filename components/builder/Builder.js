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
  const [ treeData, setTreeData ] = useState([{"name": "meme", "level": "orange", "parent": "null", "children": [{"name": "meme baby", "level": "blue", "parent": "meme", "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/29302448/square.jpeg?1545186504"}, {"name": "big money", "level": "green", "parent": "meme", "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/29302448/square.jpeg?1545186504"} ], "icon": "https://inaturalist-open-data.s3.amazonaws.com/photos/29302448/square.jpeg?1545186504"}])

  const addNode = data => {
    treeData[0].children.push(data)
    console.log(treeData)
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
