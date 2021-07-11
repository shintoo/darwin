import Image from 'next/image'
import styles from './TitleCard.module.css'
import Button from '../ui/Button'
import meme from '../../public/meme.png'

export default function TitleCard(props) {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Darwin</h1>
        <h2 className={styles.subtitle}>
          Build<span className={styles.lightgreen}>.</span>{" "}
          Explore<span className={styles.darkgreen}>.</span>{" "}
          <span className={styles.primary}>Discover.</span>
        </h2>
        <h3 className={styles.subsubtitle}>
          A whole new way to explore the tree of life.
        </h3>
        <Button href="/signin">start building ➞</Button>
      </div>

      <img
        className={styles.meme}
        src="./meme.png"
      />
    </div>
  )
}
