import { useState } from "react"
import CopyTreeUrlButton from './CopyTreeUrlButton'
import Modal from '../ui/Modal'
import styles from "./ShareButton.module.css"
import base62 from '../../lib/base62'

export default function ShareButton({ids, title}) {
  const [ opened, setOpened ] = useState(false)

  let encodedIds = []
  ids.forEach(id => encodedIds.push(base62.encode(id)))

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
