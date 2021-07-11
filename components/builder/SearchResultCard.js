import Image from 'next/image'
import styles from './SearchResultCard.module.css'

export default function SearchResultCard({ taxa }) {
   return (
     <div className={styles.card}>
       <div className={styles.imagecontainer}>
         <Image className={styles.image} layout="fill" objectFit="cover" src={taxa.image} alt={taxa.name} />
       </div>
       <div className={styles.label}>
         {taxa.name}
       </div>
     </div>
   )
}
