import { Slide } from 'react-awesome-reveal'
import { isMobile, MobileView, BrowserView } from 'react-device-detect'
import styles from './CallToActionCard.module.css'
import Button from '../ui/Button'

export default function CallToActionCard(props) {
  return (
    <Slide fraction={0} direction="up" triggerOnce>
    <div className={styles.background}>
    <img src="/mountains.png" className={styles.mountains} />
    <div className={styles.container}>
      <span className={styles.heading}>Discover. <br /> With Darwin.</span>
      <p className={styles.cta}>
        Learn about the life that surrounds you. Explore both everyday and
        exotic connections in nature. What will you find?
      </p>
      {props.isMobile ? "Darwin is currently only available on desktop." : <Button style={{padding: "15px", margin: "1em", zIndex: "3", position: "relative"}} href="/builder">start exploring ➞</Button> }
    </div>
    </div>
    </Slide>
  )
}
