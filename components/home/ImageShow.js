import Image from 'next/image'
import RellaxWrapper from 'react-rellax-wrapper'
import styles from './ImageShow.module.css'

export default function ImageShow(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.oos}>from <span style={{fontStyle: "italic"}}>the Origin of Species,</span></h1>
      <div className={styles.imageContainer1}>
        <RellaxWrapper speed={4}>
         <Image
          width={500}
          height={668}
          src={"/darwin.png"} />
        </RellaxWrapper>
      </div>
      <div className={styles.imageContainer2}>
        <RellaxWrapper speed={5}>
          <Image
            width={600}
            height={470}
            src={"/finches.png"} />
        </RellaxWrapper>
      </div>
      <div className={styles.imageContainer3}>
        <RellaxWrapper speed={6}>
          <Image
            width={410}
            height={706}
            src={"/darwin-note.png"} />
        </RellaxWrapper>
      </div>
      <h1 className={styles.exploration}>to Exploration.</h1>
    </div>
  )
}
