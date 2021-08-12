import { useState, useEffect } from "react"
import styles from "./ZoomControl.module.css"

export default function ZoomControl(props) {
   const [ buttonText, setButtonText ] = useState("Copy URL")
   const [ scale, setScale ] = useState(1)

   const zoomIn = 0
   const zoomOut = 1

   useEffect(_ => {
     let el = document.getElementsByTagName("svg")[0]
     if (!el)
       return

     el.style.transform = "scale(" + scale + ")"
   }, [scale])

   const zoom = inOrOut => {
     console.log("zooming ", inOrOut)
     let el = document.getElementsByTagName("svg")[0]
     if (!el)
       return

     const newScale = inOrOut === zoomIn ? scale * 1.05 : scale * 0.95

     el.style.transform = "scale(" + newScale + ")"

     setScale(newScale)

   }

   return (
     <div className={styles.zoomcontainer}>
       <div style={{cursor: "pointer"}} onClick={_ => zoom(zoomIn)}>
         +
       </div>
       <div style={{width: "100%", background: "#c2c2c2", height: "1px"}} />
       <div style={{cursor: "pointer"}} onClick={_ => zoom(zoomOut)}>
         -
       </div>
     </div>
   )
}
