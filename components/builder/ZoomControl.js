import styles from "./ZoomControl.module.css"
import { PlusIcon, MinusIcon } from "./Icons"

export default function ZoomControl(props) {
   const zoomIn = 0
   const zoomOut = 1

  const zoom = inOrOut => {
     const newScale = inOrOut === zoomIn ? props.scale * 1.1 : props.scale * 0.9
     props.setScale(newScale)

   }

   return (<>

     <div className={styles.zoomcontainer}>

       <div style={{cursor: "pointer"}} onClick={_ => zoom(zoomIn)}>
         <PlusIcon />
       </div>
       <img onClick={_ => props.setScale(1.0)} src="/magnifying-glass.png" />
       <div style={{cursor: "pointer"}} onClick={_ => zoom(zoomOut)}>
         <MinusIcon />
       </div>
     </div>
   </>)
}
