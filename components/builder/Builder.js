import { useState, useEffect } from 'react'
import Title from './Title'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'
import SearchBarHideButton from './SearchBarHideButton'
import RankSelector from './RankSelector'
import ParentMeme from './ParentMeme'
import Canvas from './Canvas'
import CopyTreeUrlButton from './CopyTreeUrlButton'
import ShareButton from './ShareButton'
import ZoomControl from './ZoomControl'
import LabelControl from './LabelControl'
import INatButton from './INatButton'
import Tutorial from './Tutorial'
import LogoButton from '../ui/LogoButton'
import styles from './Builder.module.css'
import getTaxa from '../../lib/taxa'
import base62 from '../../lib/base62'

export default function Builder(props) {
  const [ searchText, setSearchText ] = useState("")
  const [ searchRank, setSearchRank ] = useState("")
  const [ searchParentStack, setSearchParentStack ] = useState([])
  const [ bottomUiHidden, setBottomUiHidden ] = useState(false)
  const [ title, setTitle ] = useState(props.title || "My Tree")
  const [ treeData, setTreeData ] = useState([{common_name: "Life", sci_name: "Life", id: 48460, children: [], parent: "null",}])
  const [ trigger, setTrigger ] = useState(0)
  const [ usedIds, setUsedIds ] = useState(new Set([48460]))
  const [ startedLoadingTree, setStartedLoadingTree ] = useState(false) // Only used for [treeId] or /inat/[username] routes
  const [ useCommonNames, setUseCommonNames ] = useState(true)
  const [ scale, setScale ] = useState(1.0)
  const [ addingNode, setAddingNode ] = useState(null)
  const [ expandingNode, setExpandingNode ] = useState(null)
  let usedIdsBuffer = usedIds

  // Disable scrolling when builder is in use, but reset it when leaving builder
  useEffect(_ => {
    document.body.style.overflow = "hidden"
    return _ => document.body.style.overflow = "auto"
  })

  const deleteNode = id => {
     let deleted = false

     if (treeData[0].id == id) // Can't delete Life node
       return

     if (!usedIds.has(id))
      return

     deleted = rDeleteNode(id, treeData[0])

     if (deleted) {
       usedIds.delete(id)
       setUsedIds(usedIds)
       addTreeColors(treeData[0], [0, 360])
       treeData[0].linkColor = "white"
       setTreeData([treeData[0]])
       setTrigger(trigger+1)
     } else {
        console.log("node not found")
     }
  }

  const rDeleteNode = (id, node) => {
     if (!node.children) {
        return false
     }

     for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].children)
          if (rDeleteNode(id, node.children[i])) 
            return true

        if (node.children[i].id == id) {
            let children = node.children[i].children
            node.children.splice(i, 1)
            // Move the children up if there are any
            if (children) {
              for (let c = 0; c < children.length; c++) {
                children[c].parent = node.name
              }
              node.children.push(children)
            }
            return true
        }
     }

     return false
  }

  const addNode = async (root, data, buildingTree) => {
    console.log("in addNode with id ", data.id, " and addingNode is ", addingNode)
    setAddingNode(data.id)

    if (addingNode) {
      return
    }

    await rAddNode(root, data, buildingTree) 
    setAddingNode(null)
  }

  const rAddNode = async (root, data, buildingTree) => {
    let added = false

    if (usedIdsBuffer.has(data.id))
      return    

    // Failsafe in case we're somehow trying to add a duplicate
    if (root.id == data.id)
      return

    const findEarliestCommonAncestor = async (bro, sis) => {
        for (let i = 0; i < bro.ancestors.length; i++) {
            if (sis.ancestors.includes(bro.ancestors[i])) {
               if (usedIdsBuffer.has(bro.ancestors[i]))
                 return {id: bro.ancestors[i]}
               const taxa = await getTaxa(null, null, null, bro.ancestors[i])
               const taxon = taxa[0]
               const nodeData = {
                  "id": taxon.id,
                  "common_name": taxon.naming.common_name,
                  "sci_name": taxon.naming.rank + " " + taxon.naming.taxon,
                  "icon": taxon.photo ? taxon.photo.url.replace("medium", "square") : "",
                  "ancestors": taxon.ancestors,
                  "wikipedia_url": taxon.wikipedia_url,
               }
               return nodeData
            }
        }
        return false
    }

    if (!root.children || root.children.length === 0) {
      root.children = [{...data, parent: root.name, children: []}]
      added = true
    } else {
      for (let i = 0; i < root.children.length; i++) {
        if (added)
          break

        // Failsafe in case we are somehow adding a duplicate
        if (root.children[i].id == data.id)
          return

        // If data should go between the root and the child
        // (animals (owls)) =>
        // (animals (+birds (owls))
        if (root.children[i].ancestors.includes(data.id)) {
          data.children = [root.children[i]]
          data.children[0].parent = data.name
          root.children[i] = data
          added = true
          break
        }
        // If data should be a child of the child
        // (animals (birds)) =>
        // (animals (birds (+owls))
        if (data.ancestors.includes(root.children[i].id)) {
          // If the ancestor node has children, find where the new node should go
          // within that subtree
          added = await rAddNode(root.children[i], data)
          if (added) {
            break 
          }
        }
        // If data is a sibling of the child, find their closest parent
        // (animals (finches)) =>
        // E.g. (animals (+birds (+owls) (finches)))
        parent = await findEarliestCommonAncestor(root.children[i], data)
        if (parent) {
          if (root.id === parent.id) {
             if (i !== root.children.length - 1) {
                continue
             }
             root.children.push({...data, parent: root.name, children: []})
          } else {
             parent = {...parent, parent: root, children: [{...data, parent: parent.name, children: []}, root.children[i]]}
             root.children[i].parent = parent.name
             root.children[i] = parent
             usedIdsBuffer.add(parent.id)
          }
          added = true
          break
        }
      }
    }

   
    if (added) {
      addTreeColors(treeData[0], [0, 360])
      treeData[0].linkColor = "white"
      setTreeData([...treeData])
      setTrigger(trigger+1)
      usedIdsBuffer.add(data.id)
      if (!buildingTree) {
        setUsedIds(usedIdsBuffer)
      }
    }


    return added
  }


  const expandParentNode = async node => {
    if (expandingNode) {
      console.log("expand: expandingNode is true, returning immediately")
      return;
    }
    console.log("expand: setting expandingNode to true")
    setExpandingNode(true)
    // For each child of this node, add the next least specific ancestor
    // See issue https://github.com/shintoo/darwin/issues/9
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      const parentIndex = child.ancestors.indexOf(node.id)
      const id = child.ancestors[parentIndex - 1]
      console.log(`expand: for ${node.common_name}: parent index: ${parentIndex}, ancestors: ${child.ancestors}, to add: ${parentIndex - 1} (${id})`)
      // Skip if already in tree, or if there is nothing in between the parent and the child
      if (node.children.includes(id) || usedIds.has(id) || [child.ancestors.length - 1, 0].includes(parentIndex)) {
        console.log(`expand:    skipping add of ${id} for ${child.common_name}`)
        continue
      }

      const taxa = await getTaxa(null, null, null, id)
      const taxon = taxa[0]
      const nodeData = {
         "id": taxon.id,
         "common_name": taxon.naming.common_name,
         "sci_name": taxon.naming.rank + " " + taxon.naming.taxon,
         "icon": taxon.photo ? taxon.photo.url.replace("medium", "square") : "",
         "ancestors": taxon.ancestors,
         "wikipedia_url": taxon.wikipedia_url,
      }
      console.log(`expand: adding node (${node.common_name}, ${nodeData.common_name})`)
      addNode(node, nodeData)
    }
    console.log("expand: setting expandingNode to false")
    setExpandingNode(false)
  }

  const addTreeColors = (node, hueRange) => {
    const rangeSize = hueRange[1] - hueRange[0]
    const hue = hueRange[0] + rangeSize / 2

    node.linkColor = "hsl(" + hue + ", 100%, 70%)"

    const numChildren = (node.children && node.children.length) || 0
    if (!numChildren)
      return

    const childRangeSize = rangeSize / numChildren

    for (let i = 0; i < numChildren; i++) {
      addTreeColors(
        node.children[i], 
        [ hueRange[0] + i * childRangeSize, 
          hueRange[0] + (1+i) * childRangeSize ]
      )
    }
  }

  const buildTreeFromIds = async (ids, photos) => {
    let nodes = []

    for (let i = 0; i < ids.length; i++) {
      if (usedIdsBuffer.has(ids[i]))
        continue

      const taxa = await getTaxa(null, null, null, ids[i])
      const taxon = taxa[0]
      let icon = ""
      let usingiNatPhoto = false

      // Using iNaturalist observation photos
      if (photos && photos[i]) {
        icon = photos[i]
        usingiNatPhoto = true
      // Using default taxon photos
      } else if (taxon.photo) {
        icon = taxon.photo.url.replace("medium", "square")
      }

      const nodeData = {
         id: taxon.id,
         common_name: taxon.naming.common_name,
         sci_name: taxon.naming.rank + " " + taxon.naming.taxon,
         icon: icon,
         photo: usingiNatPhoto,
         ancestors: taxon.ancestors,
         wikipedia_url: taxon.wikipedia_url,
      }

      await rAddNode(treeData[0], nodeData, true)
    }

    addTreeColors(treeData[0], [0, 360])
    treeData[0].linkColor = "white"
    setTreeData([...treeData])
    setTrigger(trigger+1)
    setUsedIds(usedIdsBuffer)
  }

  useEffect(_ => {
    if (!startedLoadingTree && (props.treeId || (props.ids && props.ids.length > 0))) {
      setStartedLoadingTree(true)
      let ids
      let inatPhotos
      // Tree URL
      if (props.treeId) {
        const encodedIds = props.treeId.split("-")
        setTitle(encodedIds.shift().replace(/_/g, " ")) 
        ids = encodedIds.map(id => base62.decode(id))
      // iNat url
      } else if (props.ids && !startedLoadingTree) {
        setTitle(props.title)
        ids = props.ids
        inatPhotos = props.photos

      }

      buildTreeFromIds(ids, inatPhotos).then(console.log("built tree :-)"))
    }
  }, [props.treeId, props.ids, props.photos]) 

  return (
    <div>
      <Tutorial />
      <div className={styles.uitop}> 
        <div className={styles.leftui}>
          <LogoButton height={32} />
        </div>
        <Title title={title} setTitle={t => { props.setPageTitle(t); setTitle(t) }} />
        <div className={styles.rightui}>
          <LabelControl active={useCommonNames} setActive={setUseCommonNames} />
          <INatButton />
          <ZoomControl scale={scale} setScale={setScale}/>
          <ShareButton ids={usedIds} title={title} />
        </div>
      </div>
      <div>
        <Canvas deleteNode={deleteNode} expandNode={expandParentNode} data={treeData} setData={setTreeData} scale={scale} useCommonNames={useCommonNames}/>
      </div>
      <div className={[styles.uibottom, bottomUiHidden ? styles.hidden : ""].join(" ")}>
        <div style={{width: "100%", display: "flex", alignItems: "center"}}>
          <SearchBar setHide={setBottomUiHidden} setSearchText={setSearchText} setRank={setSearchRank}/>
          <ParentMeme stack={searchParentStack} setStack={setSearchParentStack} />
          <SearchBarHideButton setter={setBottomUiHidden} state={bottomUiHidden} />
        </div>
        <SearchResultBox
          query={searchText}
          rank={searchRank}
          parent={searchParentStack.length === 0 ? null : searchParentStack[searchParentStack.length-1]}
          setParent={parent => { setSearchParentStack(stack => [...stack, parent]) } }
          clearParentStack={_ => setSearchParentStack([])}
          addNode={n => addNode(treeData[0], n, false)}/>
      </div>
    </div>
  )
}
