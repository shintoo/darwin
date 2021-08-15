import styles from "./ZoomControl.module.css"

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
         +
       </div>
       <img style={{opacity: 0.5}} src="/magnifying-glass.png" width="10px" height="16px" />
       <div style={{cursor: "pointer"}} onClick={_ => zoom(zoomOut)}>
         -
       </div>
     </div>
   </>)
}
