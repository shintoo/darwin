import { useState, useEffect } from "react"
import styles from "./CopyTreeUrlButton.module.css"

export default function CopyTreeUrlButton({url, text}) {
   const [ classes, setClasses ] = useState([styles.button])
   const [ buttonText, setButtonText ] = useState(text || "Copy URL")

   useEffect(_ => setButtonText(text), [text])

   const copy = _ => {
     navigator.clipboard.writeText(url).then(function() {
       setButtonText("Copied!")
       setTimeout(() => { setButtonText(text || "Copy URL"); setClasses([styles.button]); }, 1000)
      }, function() {
        /* clipboard write failed */
      });
      setClasses([styles.button, styles.copied])
   }

   return (
     <div>
       <div onClick={copy} className={classes.join(" ")}>
         {buttonText}
       </div>
     </div>
   )
}
