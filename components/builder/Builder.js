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

  return (
    <>


      <div className={[styles.uibottom, bottomUiHidden ? styles.hidden : ""].join(" ")}>
        <SearchBar setHide={setBottomUiHidden} setSearchText={setSearchText} />
        <ParentMeme parent={searchParent && searchParent.name} setParent={setSearchParent} />
        <RankSelector setHide={setBottomUiHidden} setRank={setSearchRank} /> 
        <span onClick={() => setBottomUiHidden(!bottomUiHidden)}> {bottomUiHidden? "^" : "v"}</span>
        <SearchResultBox query={searchText} rank={searchRank} parent={searchParent && searchParent.id} setParent={setSearchParent}/>
      </div>
    </>
  )
}
