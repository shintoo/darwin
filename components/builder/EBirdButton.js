import { useState, useEffect } from 'react'
import CopyTreeUrlButton from './CopyTreeUrlButton'
import Modal from '../ui/Modal'
import styles from './EBirdButton.module.css'

export default function EBirdButton(props) {
  const [ showing, setShowing ] = useState(false)
  const [ checklistId, setChecklistId ] = useState("")
  const url = "https://darwintree.app/b/e/" + checklistId
  const copyText = "Copy URL"

  const checklistInput = e => {
    e.preventDefault()
    setChecklistId(e.target.value)
  }

  return (<>
    <div className={styles.button} onClick={_ => setShowing(!showing)}>
      <img src="/ebird.png" className={styles.icon} />
    </div>
    {showing &&
      <Modal style={{width: "25em"}} close={_ => setShowing(false)}>
        Import your <a href="https://ebird.org/">eBird</a> Checklist by entering the checklist ID below.
        The ID of your checklist can be found on the checklist page, and at the end of the URL of your checklist page,
        starting with a capital &quot;S&quot;.
        <div className={styles.inputcontainer}>
          <input
            className={styles.userinput}
            onChange={checklistInput}
            value={checklistId}
            type="text"
            placeholder="S12345..."
            />
        </div>
        { checklistId.length > 0 && <CopyTreeUrlButton url={url} text={copyText}/> }
    </Modal>
    }
  </>)
}
