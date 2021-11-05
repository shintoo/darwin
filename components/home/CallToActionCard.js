import styles from './CallToActionCard.module.css'
import Button from '../ui/Button'

export default function CallToActionCard(props) {
  return (
    <div className={styles.background}>
    <img src="/mountains.png" className={styles.mountains} />
    <div className={styles.container}>
      <span className={styles.heading}>Discover. <br /> With Darwin.</span>
      <p className={styles.cta}>
        Learn about the life that surrounds you. Explore both everyday and
        exotic connections in nature.
      </p>
      <p className={styles.cta}>
        What will you find?
      </p>
      <Button style={{margin: "1em", zIndex: "3"}} href="/builder">start exploring ➞</Button>
    </div>
    </div>
  )
}
