import { useState } from "react"
import base62 from '../../lib/base62'
import styles from "./CopyTreeUrlButton.module.css"

export default function CopyTreeUrlButton({ids, title}) {
   const [ classes, setClasses ] = useState([styles.button])
   const [ buttonText, setButtonText ] = useState("Copy URL")

   let encodedIds = []

   ids.forEach(id => encodedIds.push(base62.encode(id)))

   const copy = _ => {
     navigator.clipboard.writeText("http://localhost:3000/builder/" + title.replaceAll(" ", "_") + "-" + encodedIds.join("-")).then(function() {
       setButtonText("Copied!")
       setTimeout(() => { setButtonText("Copy URL"); setClasses([styles.button]); }, 1000)
      }, function() {
        /* clipboard write failed */
      });
      setClasses([styles.button, styles.copied])
   }

   return (
     <div className={classes.join(" ")} onClick={copy}>
       {buttonText}
     </div>
   )
}
