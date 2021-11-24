import { Slide } from 'react-awesome-reveal'
import styles from './CallToActionCard.module.css'
import Button from '../ui/Button'

export default function CallToActionCard(props) {
  return (
    <Slide fraction={0} direction="up">
    <div className={styles.background}>
    <img src="/mountains.png" className={styles.mountains} />
    <div className={styles.container}>
      <span className={styles.heading}>Discover. <br /> With Darwin.</span>
      <p className={styles.cta}>
        Learn about the life that surrounds you. Explore both everyday and
        exotic connections in nature. What will you find?
      </p>
      <Button style={{padding: "15px", margin: "1em", zIndex: "3"}} href="/builder">start exploring ➞</Button>
    </div>
    </div>
    </Slide>
  )
}
