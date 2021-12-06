import { useState, useEffect } from "react"
import CopyTreeUrlButton from './CopyTreeUrlButton'
import Modal from '../ui/Modal'
import styles from "./ShareButton.module.css"
import base62 from '../../lib/base62'

export default function ShareButton({tree, title}) {
  const [ opened, setOpened ] = useState(false)
  const [ shareIds, setShareIds ] = useState([])

  useEffect(_ => {
    const ids = getIds(tree[0])
    setShareIds(_ => ids)
  }, [opened])

  const encodedIds = shareIds.map(base62.encode)
  const url = "https://darwintree.app/builder/" + (title && title.replace(/ /g, "_")) + "-" + encodedIds.join("-")
  const tweetText = "Check out this phylogenetic tree I built with Darwin:"
  const mailto = 'mailto:?subject=Check out my tree "' + title + '" on Darwin&body=I made a phylogenetic tree using Darwin:  ' + url

  return (<>
    <div>
      <div className={styles.sharebutton} onClick={_ => setOpened(!opened)}>
        Share<img src="/share.png" width="16" height="16" />
      </div>
    </div>
    { opened &&
      <Modal style={{width: "auto"}} close={_ => setOpened(false)}>
          <div className={styles.share}>Share <i>{title}</i></div>
          <div className={styles.sharebuttons}>
            <CopyTreeUrlButton text={"Copy " + title + " URL"} url={url} isIcon />
            <a href={"https://twitter.com/intent/tweet?text=" + tweetText + "&url=" + url}>
              <div className={`${styles.button} ${styles.tweet}`}>
                <img src="/twt.png" alt=""/>
              </div>
            </a>
            <a href={mailto}>
              <div className={`${styles.button} ${styles.mailto}`}>
                <img src="/email.png" alt=""/>
              </div>
            </a>
          </div>
      </Modal>
    }
  </>)
}


// Exclude Life and nodes with more than one child as they will be added automatically during load
function getIds(node) {
  let ids = []

  // Add leaf nodes
  if (!node.children) {
    ids.push(node.id)
    return ids.filter(id => id != 48460)
  }

  // Add intentional intermediate nodes and leaf nodes)
  if (node.children.length <= 1) {
    ids.push(node.id)
  }

  // Recurse through children
  for (let i = 0; i < node.children.length; i++) {
    const childIds = getIds(node.children[i])
    if (childIds.length > 0) {
      ids.push(...childIds)
    }
  }

  return ids.filter(id => id != 48460)
}
