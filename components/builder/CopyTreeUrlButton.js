import { useState, useEffect } from "react"
import copy from 'copy-to-clipboard'
import styles from "./CopyTreeUrlButton.module.css"

export default function CopyTreeUrlButton({url, text, isIcon}) {
   const buttonStyle = isIcon ? styles.icon : styles.button
   const [ classes, setClasses ] = useState([buttonStyle])
   const [ buttonText, setButtonText ] = useState(text || "Copy URL")


   useEffect(_ => setButtonText(text), [text])

   const copyURL = _ => {
     const success = copy(url)
     setTimeout(() => { setButtonText(text || "Copy URL"); setClasses([buttonStyle]); }, 1000)
     if (success) {
       setButtonText("Copied!")
       setClasses([buttonStyle, styles.copied])
     } else {
       setButtonText("Error copying :(")
     }
   }

   return (
     <div>
       <div onClick={copyURL} className={classes.join(" ")}>
         {isIcon ? <img src="/copy.png" alt="copy" /> :  buttonText}
       </div>
     </div>
   )
}
