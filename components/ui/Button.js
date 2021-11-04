import Link from 'next/link'
import styles from './Button.module.css'

export default function Button(props) {
   return (
     <Link href={props.href}>
       <span style={props.style} className={styles.button}>
         {props.children}
       </span>
     </Link>
   )
}
