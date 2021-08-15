import { useState } from "react"
import styles from "./CopyTreeUrlButton.module.css"

export default function CopyTreeUrlButton({url}) {
   const [ classes, setClasses ] = useState([styles.button])
   const [ buttonText, setButtonText ] = useState("Copy URL")
   const copy = _ => {
     navigator.clipboard.writeText(url).then(function() {
       setButtonText("Copied!")
       setTimeout(() => { setButtonText("Copy URL"); setClasses([styles.button]); }, 1000)
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
