import Image from 'next/image'
import RellaxWrapper from 'react-rellax-wrapper'
import styles from './ImageShow.module.css'
import darwin from '../../public/darwin.png'
import note from '../../public/darwin-note.png'
import finches from '../../public/finches.png'

export default function ImageShow(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.oos}>from <span style={{fontStyle: "italic"}}>the Origin of Species,</span></h1>
      <div className={styles.imageContainer1}>
        <RellaxWrapper speed={4}>
         <Image
          width={500}
          height={668}
          src={darwin} />
        </RellaxWrapper>
      </div>
      <div className={styles.imageContainer2}>
        <RellaxWrapper speed={4}>
          <Image
            width={600}
            height={470}
            src={finches} />
        </RellaxWrapper>
      </div>
      <div className={styles.imageContainer3}>
        <RellaxWrapper speed={4}>
          <Image
            width={410}
            height={706}
            src={note} />
        </RellaxWrapper>
      </div>
      <h1 className={styles.exploration}>to Exploration.</h1>
    </div>
  )
}
