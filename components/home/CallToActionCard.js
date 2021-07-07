import styles from './CallToActionCard.module.css'
import Button from '../ui/Button'

export default function CallToActionCard(props) {
  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <span className={styles.heading}>Discover. <br /> With Darwin.</span>
      <p className={styles.cta}>
        Learn about the life that surrounds you. Explore both everyday and
        exotic connections in nature.
      </p>
      <p className={styles.cta}>
        What will you find?
      </p>
      <Button style={{margin: "1em"}} href="/signin">start exploring ➞</Button>
    </div>
    </div>
  )
}
