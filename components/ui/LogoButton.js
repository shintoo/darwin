import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.png'

export default function LogoButton(props) {
  return (
    <Link href="/">
      <Image
        src={logo}
        width={250}
        height={58}
      />
    </Link>
  )
}
