import Link from 'next/link'
import Image from 'next/image'
import styles from './LogoButton.module.css'

export default function LogoButton(props) {
  return (
    <Link href="/">
      <Image
        className={styles.pointer}
        src={"/logo.png"}
        width={250}
        height={58}
      />
    </Link>
  )
}
