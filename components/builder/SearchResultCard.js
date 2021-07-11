import Image from 'next/image'
import styles from './SearchResultCard.module.css'

export default function SearchResultCard({ taxa }) {
   return (
     <div className={styles.card}>
       <Image width={300} height={300} src={taxa.image} alt={taxa.name} />
       <div className={styles.label}>
         {taxa.name}
       </div>
     </div>
   )
}
