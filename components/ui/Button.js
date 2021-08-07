import Link from 'next/link'
import styles from './Button.module.css'

export default function Button(props) {
   return (
     <span style={props.style} className={styles.button}>
       <Link href={props.href}>{props.children}</Link>
     </span>
   )
}
