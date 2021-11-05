import { useState } from "react"
import CopyTreeUrlButton from './CopyTreeUrlButton'
import Modal from '../ui/Modal'
import styles from "./ShareButton.module.css"
import base62 from '../../lib/base62'

export default function ShareButton({ids, title}) {
  const [ opened, setOpened ] = useState(false)

  let encodedIds = []
  ids.forEach(id => encodedIds.push(base62.encode(id)))

  console.log("TITLE: ", title)
  const url = "http://localhost:3000/builder/" + (title && title.replace(/ /g, "_")) + "-" + encodedIds.join("-")
  const tweetText = "Check out this phylogenetic tree I built with Darwin:"

  return (<>
    <div>
      <div className={styles.button} onClick={_ => setOpened(!opened)}>
        Share<img src="/share.png" width="16" height="16" />
      </div>
    </div>
    { opened &&
      <Modal close={_ => setOpened(false)}>
          <p>Want to share <i>{title}</i> with a friend? Click the "Copy URL" button to copy a
          unique link to your tree. Or, show the world your tree with the Tweet button. </p>
          <CopyTreeUrlButton text={"Copy " + title + " URL"} url={url} />
          <a href={"https://twitter.com/intent/tweet?text=" + tweetText + "&url=" + url}>
            <div className={styles.tweet}>
              <img src="twt.png" />
              Tweet
            </div>
          </a>
      </Modal>
    }
  </>)
}
