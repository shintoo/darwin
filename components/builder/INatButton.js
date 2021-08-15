import { useState, useEffect } from 'react'
import styles from './INatButton.module.css'

export default function INatButton(props) {
  const [ showing, setShowing ] = useState(false)
  const [ username, setUsername ] = useState("")
  const [ numObs, setNumObs ] = useState(10)
  const url = "localhost:3000/builder/inat/" + username + "-" + numObs

  const userInput = e => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  const numInput = e => {
    e.preventDefault()
    const numeric = e.target.value.replace(/\D/g, "")
    setNumObs(+numeric)
  }

  return (<>
    <div className={styles.button} onClick={_ => setShowing(!showing)}>
      <img src="/inat.png" className={styles.icon} />
    </div>
    {showing &&
    <div onClick={_ => setShowing(false)} className={styles.overlaycontainer}>
      <div onClick={e=>e.stopPropagation()} className={styles.overlay} >
        <img onClick={_ => setShowing(false)} src="/inat.png" className={styles.overlayicon} />
        Have an <a className={styles.link} href="https://www.inaturalist.org">iNaturalist</a> account? <br />
        Enter your iNaturalist username below to generate
        a tree of your observations.
        <br />
        <input
          className={styles.userinput}
          onChange={userInput}
          value={username}
          type="text"
          placeholder="username"
          />, {" "} 
        <input
          className={styles.numInput}
          onChange={numInput}
          value={numObs}
          type="number"
          /> latest observations
        <br />
        { username.length > 0 &&
          <a className={styles.link} href={url}>{url}</a>
        }
      </div>
    </div>
    }
  </>)
}
