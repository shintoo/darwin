import { useState, useEffect } from "react"
import copy from 'copy-to-clipboard'
import styles from "./CopyTreeUrlButton.module.css"

export default function CopyTreeUrlButton({url, text}) {
   const [ classes, setClasses ] = useState([styles.button])
   const [ buttonText, setButtonText ] = useState(text || "Copy URL")

   useEffect(_ => setButtonText(text), [text])

   const copyURL = _ => {
     const success = copy(url)
     setTimeout(() => { setButtonText(text || "Copy URL"); setClasses([styles.button]); }, 1000)
     if (success) {
       setButtonText("Copied!")
       setClasses([styles.button, styles.copied])
     } else {
       setButtonText("Error copying :(")
     }
   }

   return (
     <div>
       <div onClick={copyURL} className={classes.join(" ")}>
         {buttonText}
       </div>
     </div>
   )
}
