import { useState } from 'react'
import Title from './Title'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'
import SearchBarHideButton from './SearchBarHideButton'
import ParentMeme from './ParentMeme'
import Canvas from './Canvas'
import ShareButton from './ShareButton'
import ZoomControl from './ZoomControl'
import LabelControl from './LabelControl'
import INatButton from './INatButton'
import EBirdButton from './EBirdButton'
import Tutorial from './Tutorial'
import LogoButton from '../ui/LogoButton'
import styles from './Builder.module.css'
import useTreeBuilder from '../../lib/useTreeBuilder'
import { LIFE_PARENT } from '../../lib/taxa'

export default function DesktopBuilder(props) {
  const [ searchText, setSearchText ] = useState("")
  const [ searchRank, setSearchRank ] = useState("")
  const [ searchParentStack, setSearchParentStack ] = useState([])
  const [ bottomUiHidden, setBottomUiHidden ] = useState(false)
  const [ useCommonNames, setUseCommonNames ] = useState(true)
  const [ scale, setScale ] = useState(1.0)

  const { treeData, setTreeData, deleteNode, addNode } = useTreeBuilder(props)

  // Default the browse to Life's children (kingdoms) until the user drills in or
  // types a query; a query searches all of life, so parent must be null then.
  const searchParent =
    searchParentStack.length > 0 ? searchParentStack[searchParentStack.length-1]
    : searchText ? null
    : LIFE_PARENT

  return (
    <div>
      <Tutorial />
      <div className={styles.uitop}>
        <div className={styles.leftui}>
          <LogoButton height={32} />
          <Title title={props.title} setTitle={props.setTitle} />
        </div>
        <div className={styles.rightui}>
          <INatButton />
          <EBirdButton />
          <LabelControl active={useCommonNames} setActive={setUseCommonNames} />
          <ZoomControl scale={scale} setScale={setScale}/>
          <ShareButton tree={treeData} title={props.title} />
        </div>
      </div>
      <div>
        <Canvas deleteNode={deleteNode} data={treeData} setData={setTreeData} scale={scale} useCommonNames={useCommonNames}/>
      </div>
      <div className={[styles.uibottom, bottomUiHidden ? styles.hidden : ""].join(" ")}>
        <div className={styles.search}>
          <SearchBar setHide={setBottomUiHidden} setSearchText={setSearchText} setRank={setSearchRank}/>
          <ParentMeme stack={searchParentStack} setStack={setSearchParentStack} />
        </div>
        <SearchBarHideButton setter={setBottomUiHidden} state={bottomUiHidden} />
        <SearchResultBox
          query={searchText}
          rank={searchRank}
          parent={searchParent}
          setParent={parent => { setSearchParentStack(stack => [...stack, parent]) } }
          clearParentStack={_ => setSearchParentStack([])}
          addNode={addNode}/>
      </div>
    </div>
  )
}
