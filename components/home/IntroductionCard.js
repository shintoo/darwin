import Image from 'next/image'
import styles from './IntroductionCard.module.css'

export default function IntroductionCard(props) {
   return (
     <div className={styles.container}>
       <div className={styles.row}>
         <div style={{marginRight: "5em"}} className={styles.card}>
           <span className={styles.heading}>Build<span className={styles.lightgreen}>.</span></span>
           <p className={styles.blurb}>
             Search for anything you can think of. An order of bird, a species of jellyfish.
             Then, as you add taxa to the canvas, watch the phylogenetic tree grow.
           </p>
         </div>
{/*         <div style={{background: "#aacccc", width: "300px", height: "200px", margin: "1em"}} /> */}
          <Image
           width={532}
           height={382}
           src={"/chart.png"}
         />
       </div>
       <div className={styles.row}>
{/*         <div style={{background: "#aacccc", width: "300px", height: "200px", margin: "1em"}} /> */}
         <Image
           width={450}
           height={548}
           src={"/sugs.png"}
         />
         <div style={{marginLeft: "5em"}} className={styles.card}>
           <span className={styles.heading}>Explore<span className={styles.darkgreen}>.</span></span>
           <p className={styles.blurb}>
             Browse trees others have built. As you build more trees of your own,
             suggestions based off of taxa you are interested in will be right at your fingertips.
           </p>
         </div>
       </div>
     </div>
   )
}
