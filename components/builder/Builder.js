import { useState, useEffect } from 'react'
import Title from './Title'
import SearchBar from './SearchBar'
import SearchResultBox from './SearchResultBox'
import SearchBarHideButton from './SearchBarHideButton'
import RankSelector from './RankSelector'
import ParentMeme from './ParentMeme'
import Canvas from './Canvas'
import CopyTreeUrlButton from './CopyTreeUrlButton'
import LogoButton from '../ui/LogoButton'
import styles from './Builder.module.css'
import getTaxa from '../../lib/taxa'
import base62 from '../../lib/base62'

export default function Builder(props) {
  const [ searchText, setSearchText ] = useState("")
  const [ searchRank, setSearchRank ] = useState("")
  const [ searchParent, setSearchParent ] = useState(null)
  const [ bottomUiHidden, setBottomUiHidden ] = useState(false)
  const [ title, setTitle ] = useState("My Tree")
  const [ treeData, setTreeData ] = useState([{name: "Life", id: 48460, children: [], parent: "null",}])
  const [ usedIds, setUsedIds ] = useState(new Set([48460]))
  const [ startedLoadingTree, setStartedLoadingTree ] = useState(false) // Only used for [treeId] or /inat/[username] routes
  let usedIdsBuffer = usedIds


  const deleteNode = id => {
     let deleted = false

     if (treeData[0].id == id) // Can't delete Life node
       return


     if (!usedIds.has(id))
      return

     console.log("deleting node for ", id)

     deleted = rDeleteNode(id, treeData[0])

     if (deleted) {
       console.log("setting new treeData: ", treeData)
       setTreeData([treeData[0]])
       usedIds.delete(id)
       setUsedIds(usedIds)
     } else {
        console.log("node not found")
     }
  }


  const rDeleteNode = (id, node) => {
     console.log("rDeleteNode ", id, node)

     if (!node.children) {
        console.log("no children: ", node.children)
        return false
     }

     for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].children)
          if (rDeleteNode(id, node.children[i])) 
            return true


        console.log("foreach in rdn: '", node.children[i].id, "', '", id, "'")
        if (node.children[i].id == id) {
            node.children.splice(i, 1)
            return true
        }
     }

     return false
  }

  const addNode = async (root, data, buildingTree) => {
    console.log("addNode(", root.name, ", ", data.name, ")")
    let added = false

    if (usedIdsBuffer.has(data.id))
      return    

    const findEarliestCommonAncestor = async (bro, sis) => {
        console.log("finding eca between ", bro.name, "(", bro.ancestors, ") and ", sis.name, "(", sis.ancestors, ")")
        for (let i = 0; i < bro.ancestors.length; i++) {
            if (sis.ancestors.includes(bro.ancestors[i])) {
               if (usedIdsBuffer.has(bro.ancestors[i]))
                 return {id: bro.ancestors[i]}
               const taxa = await getTaxa(null, null, null, bro.ancestors[i])
               const taxon = taxa[0]
               const nodeData = {
                  "id": taxon.id,
                  "name": taxon.naming.common_name ? taxon.naming.common_name : taxon.naming.taxon,
                  "icon": taxon.photo ? taxon.photo.url.replace("medium", "square") : "",
                  "ancestors": taxon.ancestors
               }

               return nodeData
            }
        }

        return false
    }

    if (!root.children || root.children.length === 0) {
      root.children = [{...data, parent: root.name, children: []}]
      added = true
      console.log("added ", data.name, "as only child under ", root.name)
    } else {
      for (let i = 0; i < root.children.length; i++) {
        if (added)
          break
        // If data should go between the root and the child
        // (animals (owls)) =>
        // (animals (+birds (owls))
        if (root.children[i].ancestors.includes(data.id)) {
          data.children = [root.children[i]]
          data.children[0].parent = data.name
          root.children[i] = data
          added = true
          console.log("added ", data.name, "as parent of ", root.children[i].name)
          break
        }
        // If data should be a child of the child
        // (animals (birds)) =>
        // (animals (birds (+owls))
        if (data.ancestors.includes(root.children[i].id)) {
          // If the ancestor node has children, find where the new node should go
          // within that subtree
          console.log("descending to ", root.children[i].name)
          added = await addNode(root.children[i], data)
          if (added) {
            console.log("added")
            break 
          }
          console.log("not added")
        }
        // If data is a sibling of the child, find their closest parent
        // (animals (finches)) =>
        // E.g. (animals (+birds (+owls) (finches)))
        parent = await findEarliestCommonAncestor(root.children[i], data)
        console.log("parent from feca: ", parent)
        if (parent) {
          console.log("got earliest common ancestor: ", parent.name)
          if (root.id === parent.id) {
             if (i !== root.children.length - 1) {
                console.log("eca is parent, continuing to next child")
                continue
             }
             console.log("eca was parent, adding ", data.name, "as a child")
             root.children.push({...data, parent: root.name, children: []})
          } else {
             parent = {...parent, parent: root, children: [{...data, parent: parent.name, children: []}, root.children[i]]}
             root.children[i].parent = parent.name
             root.children[i] = parent
             usedIdsBuffer.add(parent.id)
             console.log("added new eca parent ", parent.name, "with children ", data.name, " ", parent.children[1].name)
          }
          added = true
          break
        }
        console.log("no common ancestor between ", root.children[i].name, data.name)
      }
    }

   
    if (added) {
      addTreeColors(treeData[0], [0, 360])
      treeData[0].linkColor = "white"
      setTreeData([...treeData])
      usedIdsBuffer.add(data.id)
      if (!buildingTree) {
        console.log("setting usedIds to", usedIdsBuffer)
        setUsedIds(usedIdsBuffer)
      }
    }

    console.log("Finished adding ", data.id, "usedIdsBuffer is now ", usedIdsBuffer)
    return added
  }

  const addTreeColors = (node, hueRange) => {
    console.log("hueRange: ", hueRange)
    const rangeSize = hueRange[1] - hueRange[0]
    const hue = hueRange[0] + rangeSize / 2
    console.log("setting ", node.id, "linkColor to hue ", hue)
    node.linkColor = "hsl(" + hue + ", 100%, 70%)"

    const numChildren = (node.children && node.children.length) || 0
    if (!numChildren)
      return

    console.log("numChildren for ", node.id, numChildren)
    const childRangeSize = rangeSize / numChildren

    for (let i = 0; i < numChildren; i++) {
      addTreeColors(
        node.children[i], 
        [ hueRange[0] + i * childRangeSize, 
          hueRange[0] + (1+i) * childRangeSize ]
      )
    }
  }

  const buildTreeFromIds = async ids => {
   console.log(ids)
   let nodes = []
    for (let i = 1; i < ids.length; i++) {
      if (usedIdsBuffer.has(ids[i]))
        continue

      console.log("id: ", ids[i])
      const taxa = await getTaxa(null, null, null, ids[i])
      const taxon = taxa[0]
      const nodeData = {
         "id": taxon.id,
         "name": taxon.naming.common_name ? taxon.naming.common_name : taxon.naming.taxon,
         "icon": taxon.photo ? taxon.photo.url.replace("medium", "square") : "",
         "ancestors": taxon.ancestors
      }
      console.log("about to call addNode(", treeData[0].id, ", ", nodeData.id, ")")
      await addNode(treeData[0], nodeData, true)
    }
    console.log("usedIdsBuffer after tree build complete: ", usedIdsBuffer)
    addTreeColors(treeData[0], [0, 360])
    treeData[0].linkColor = "white"
    setTreeData([...treeData])
    setUsedIds(usedIdsBuffer)
  }

  useEffect(_ => {
    if (!startedLoadingTree && (props.treeId || (props.ids && props.ids.length > 0))) {
      setStartedLoadingTree(true)
      let ids
      if (props.treeId) {
        const encodedIds = props.treeId.split("-")
        setTitle(encodedIds.shift().replace("_", " ")) 
        ids = encodedIds.map(id => base62.decode(id))
      } else if (props.ids && !startedLoadingTree) {
        setTitle(props.title)
        ids = props.ids
      }
      buildTreeFromIds(ids).then(console.log("built tree :-)"))
    }
  }, [props.treeId, props.ids])

  return (
    <div style={{overflowY: "hidden"}}>
      <div className={styles.uitop}>
        <LogoButton />
        <Title title={title} setTitle={setTitle} />
        <CopyTreeUrlButton ids={usedIds} title={title} />
      </div>
      <div>
        <Canvas deleteNode={deleteNode} data={treeData} setData={setTreeData} count={usedIds.size}/>
      </div>
      <div className={[styles.uibottom, bottomUiHidden ? styles.hidden : ""].join(" ")}>
        <div style={{width: "100%", display: "flex", alignItems: "center"}}>
          <SearchBar setHide={setBottomUiHidden} setSearchText={setSearchText} />
          <ParentMeme parent={searchParent && searchParent.name} setParent={setSearchParent} />
          <RankSelector setHide={setBottomUiHidden} setRank={setSearchRank} /> 
          <SearchBarHideButton setter={setBottomUiHidden} state={bottomUiHidden} />
        </div>
        <SearchResultBox
          query={searchText}
          rank={searchRank}
          parent={searchParent && searchParent.id}
          setParent={setSearchParent}
          addNode={n => addNode(treeData[0], n, false)}/>
      </div>
    </div>
  )
}
