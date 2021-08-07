import Link from 'next/link'
import Image from 'next/image'

export default function LogoButton(props) {
  return (
    <Link href="/">
      <Image
        src={"/logo.png"}
        width={250}
        height={58}
      />
    </Link>
  )
}
