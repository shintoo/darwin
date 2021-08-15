import Link from 'next/link'
import Image from 'next/image'
import styles from './LogoButton.module.css'

export default function LogoButton(props) {
  let width = props.width
  let height = props.height

  if (width && !height) {
    height = width / 4.31
  } else if (height && !width) {
    width = height * 4.31
  } else {
    width = 250
    height = 58
  }

  return (
    <Link href="/">
      <Image
        className={styles.pointer}
        src={"/logo.png"}
        width={width}
        height={height}
      />
    </Link>
  )
}
