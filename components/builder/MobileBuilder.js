import { useState } from 'react'
import Title from './Title'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'
import ParentMeme from './ParentMeme'
import MobileCanvas from './MobileCanvas'
import ShareButton from './ShareButton'
import ZoomControl from './ZoomControl'
import LabelControl from './LabelControl'
import INatButton from './INatButton'
import EBirdButton from './EBirdButton'
import Tutorial from './Tutorial'
import LogoButton from '../ui/LogoButton'
import styles from './MobileBuilder.module.css'
import useTreeBuilder from '../../lib/useTreeBuilder'
import { LIFE_PARENT } from '../../lib/taxa'

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  )
}

export default function MobileBuilder(props) {
  const [ searchText, setSearchText ] = useState("")
  const [ searchRank, setSearchRank ] = useState("")
  const [ searchParentStack, setSearchParentStack ] = useState([])
  const [ searchHidden, setSearchHidden ] = useState(false)
  const [ searchOpen, setSearchOpen ] = useState(false)
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ useCommonNames, setUseCommonNames ] = useState(true)
  const [ scale, setScale ] = useState(1.0)

  const { treeData, setTreeData, deleteNode, addNode } = useTreeBuilder(props)

  const openSearch = () => { setSearchOpen(true); setSearchHidden(false); setMenuOpen(false) }
  const closeSearch = () => setSearchOpen(false)

  // Adding closes the search panel so you immediately see the result on the
  // tree; the tray stays populated so you can keep dragging more from it.
  const addAndReveal = node => { closeSearch(); addNode(node) }

  const browsing = searchParentStack.length > 0
  // Default the browse to Life's children (kingdoms) until the user drills in or
  // types a query; a query searches all of life, so parent must be null then.
  const searchParent =
    browsing ? searchParentStack[searchParentStack.length-1]
    : searchText ? null
    : LIFE_PARENT
  const levelLabel = searchText ? `“${searchText}”` : "Kingdoms"

  const sheetClass = [
    styles.sheet,
    searchHidden && !searchOpen ? styles.sheetHidden : "",
    searchOpen ? styles.sheetRaised : "",
  ].join(" ")

  return (
    <div className={styles.root}>
      <Tutorial />

      <MobileCanvas
        deleteNode={deleteNode}
        data={treeData}
        setData={setTreeData}
        scale={scale}
        setScale={setScale}
        useCommonNames={useCommonNames}
      />

      <div className={styles.topbar}>
        <div className={styles.topleft}>
          <LogoButton height={26} />
          <Title title={props.title} setTitle={props.setTitle} />
        </div>
        <div className={styles.topright}>
          <ShareButton tree={treeData} title={props.title} />
          <div
            className={styles.menubutton}
            onClick={_ => setMenuOpen(o => !o)}
            aria-label="menu"
          >
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>

        { menuOpen &&
          <div className={styles.menu} onClick={_ => setMenuOpen(false)}>
            <div className={styles.menuitem} onClick={e => e.stopPropagation()}>
              <span>Zoom</span>
              <ZoomControl scale={scale} setScale={setScale} />
            </div>
            <div className={styles.menuitem} onClick={e => e.stopPropagation()}>
              <LabelControl active={useCommonNames} setActive={setUseCommonNames} />
            </div>
            <div className={styles.menuitem} onClick={e => e.stopPropagation()}>
              <span>Import from iNaturalist</span>
              <INatButton />
            </div>
            <div className={styles.menuitem} onClick={e => e.stopPropagation()}>
              <span>Import from eBird</span>
              <EBirdButton />
            </div>
          </div>
        }
      </div>

      {/* Centered search panel. The dock/tray below stays lifted above the
          backdrop so results remain visible and draggable while searching. */}
      { searchOpen && <>
        <div className={styles.searchBackdrop} onClick={closeSearch} />
        <div className={styles.searchPanel}>
          <div className={styles.searchPanelHead}>
            <span className={styles.searchPanelTitle}>Search taxa</span>
            <div className={styles.searchClose} onClick={closeSearch} aria-label="close search">✕</div>
          </div>
          <SearchBar autoFocus setHide={() => {}} setSearchText={setSearchText} setRank={setSearchRank} />
        </div>
      </> }

      <div className={sheetClass}>
        <div className={styles.handle} onClick={_ => setSearchHidden(h => !h)}>
          <div className={styles.handlebar} />
        </div>

        <div className={styles.dockheader}>
          <div className={styles.searchbutton} onClick={openSearch} aria-label="search">
            <SearchIcon />
          </div>
          <div className={styles.crumbs}>
            { browsing
              ? <ParentMeme stack={searchParentStack} setStack={setSearchParentStack} />
              : <span className={styles.level}>{levelLabel}</span>
            }
          </div>
          { searchText &&
            <div className={styles.clear} onClick={_ => { setSearchText(""); setSearchParentStack([]) }}>
              clear
            </div>
          }
        </div>

        <SearchResultBox
          query={searchText}
          rank={searchRank}
          mobile
          parent={searchParent}
          setParent={parent => { setSearchParentStack(stack => [...stack, parent]) } }
          clearParentStack={_ => setSearchParentStack([])}
          addNode={addAndReveal}
        />
      </div>
    </div>
  )
}
