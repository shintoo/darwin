import Link from 'next/link'
import styles from './Button.module.css'

export default function Button(props) {
   const contents = (
     <span style={props.style} className={styles.button} onClick={props.onClick}>
         {props.children}
     </span>
   )

   if ("href" in props)
     return <Link href={props.href}>{contents}</Link>

   return contents
}
