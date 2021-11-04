import Image from 'next/image'
import styles from './IntroductionCard.module.css'

export default function IntroductionCard(props) {
   return (
     <div className={styles.container}>
       <div className={styles.row}>
         <div style={{marginRight: "5em"}} className={styles.card}>
           <span className={styles.heading}>Explore<span className={styles.lightgreen}>.</span></span>
           <p className={styles.blurb}>
             Search for anything you can think of. An order of bird, a species of jellyfish.
             Or, just click around the tree of life, and see what you can find.
           </p>
         </div>
         <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Image
           width={764}
           height={360}
           src={"/search.png"}
         />
         <span className={styles.caption}>
            Click the taxon's card to view its children. Click the + button to add it to the tree.
         </span>
         </div>
       </div>

       <div className={styles.row}>
         <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Image
           width={610}
           height={493}
           src={"/anim.gif"}
         />
         <span className={styles.caption}>
             The <i>Anhinga</i> is first added. Then, the <i>Double-crested Cormorant</i>. Finally, the <i>Great Cormorant</i>. <a className={styles.link} href="http://localhost:3000/builder/Anhinga_and_Cormorants-cBC-1jF-ixu-16N-16L-16S">Open this tree in the Builder.</a>
         </span>
         </div>
         <div style={{marginLeft: "5em"}} className={styles.card}>
           <span className={styles.heading}>Build<span className={styles.lightgreen}>.</span></span>
           <p className={styles.blurb}>
             As you add taxa to the canvas, watch the phylogenetic tree grow. Relationships between
             taxa are automatically created and connected.
           </p>
         </div>
       </div>
       <div className={styles.row}>
         <div style={{marginRight: "5em"}} className={styles.card}>
           <span className={styles.heading}>Share<span className={styles.darkgreen}>.</span></span>
           <p className={styles.blurb}>
              Share trees you have built with others. A unique link can be generated for any tree at the tap of a button.
           </p>
         </div>
         <Image
           width={450}
           height={293}
           src={"/convo.png"}
         />
       </div>
     </div>
   )
}
