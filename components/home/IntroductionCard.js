import Image from 'next/image'
import Link from 'next/link'
import { Slide, Fade } from 'react-awesome-reveal'
import styles from './IntroductionCard.module.css'

export default function IntroductionCard(props) {
   const isMobile = props.isMobile
   let Slider = isMobile ? "div" : Slide
   return (
     <div className={styles.container}>
     <Slider fraction={0.8} triggerOnce direction="left">
       <div className={styles.row}>
         <div className={styles.card}>
           <span className={styles.heading}>Explore<span className={styles.lightgreen}>.</span></span>
           <img src="/pika2.png" className={styles.pika}/>
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
            Click the taxon&apos;s card to view its children. Click the + button to add it to the tree.
         </span>
         </div>
       </div>
       </Slider>

       { !isMobile &&
       <Fade fraction={0.5} triggerOnce>
       <div style={{ display: "flex", justifyContent: "center" }}>
         <img src="/pikaprints.png" className={styles.pikatracks} style={{ marginTop: "5em" }}/>
       </div>
       </Fade>
       }

       <Slider fraction={0.8} triggerOnce direction="right">
       <div className={styles.row}>
       {[<div style={{display: "flex", flexDirection: "column", alignItems: "center"}} key="0">
          <Image
           width={610}
           height={493}
           src={"/anim.gif"}
         />
         <span className={styles.caption}>
             The <i>Anhinga</i> is first added. Then, the <i>Double-crested Cormorant</i>. Finally, the <i>Great Cormorant</i>. { !isMobile && <Link href="/builder/Anhinga_and_Cormorants-cBC-1jF-ixu-16N-16L-16S"><span className={styles.link}>Open this tree in the Builder.</span></Link> }
         </span>
       </div>,
       <div className={styles.card} key="1">
           <img src="/anhinga.png" className={styles.anhinga}/>
           <span className={styles.heading}>Build<span className={styles.lightgreen}>.</span></span>
           <p className={styles.blurb}>
             As you add taxa to the canvas, watch the phylogenetic tree grow. Relationships between
             taxa are automatically created and connected.
           </p>
         </div>
       ][isMobile ? "reverse" : "flat"]() /* hehe */}
       </div>
       </Slider>

       { !isMobile &&
       <Fade fraction={0.5} triggerOnce>
       <div style={{ display: "flex", justifyContent: "center" , transform: "scaleX(-1)"}}>
         <img src="/pikaprints.png" className={styles.pikatracks} style={{ marginBottom: "8em" }} />
       </div>
       </Fade>
       }

       <Slider fraction={0.8} triggerOnce direction="left">
       <div className={styles.row}>
         <div className={styles.card}>
           <img src="/seedling.png" className={styles.seedling}/>
           <span className={styles.heading}>Share<span className={styles.darkgreen}>.</span></span>
           <p className={styles.blurb}>
              Share trees you have built with others. A unique link can be generated for any tree at the tap of a button.
           </p>
         </div>
         { isMobile ||
         <Image
           width={450}
           height={293}
           src={"/convo.png"}
         /> }
       </div>
       </Slider>
     </div>
   )
}
