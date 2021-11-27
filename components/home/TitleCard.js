import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './TitleCard.module.css'
import Button from '../ui/Button'

export default function TitleCard(props) {
  const [ accent, setAccent ] = useState("#FFF8")
  const backgrounds = ["ladybeetle", "bee", "moss", "leafhopper", "moth", "plant1", "mushroom", "babyshroom", "leaf", "cypress1", "cypress2"]
  const selected = backgrounds[Math.floor(Math.random()*backgrounds.length)]
  const background = 'url(' + selected + '.jpeg) no-repeat center center fixed'
  const isMobile = props.isMobile

  return (
    <div className={styles.container} style={{ background: background, backgroundSize: "cover" }}>
      <div className={styles.toplinks}>
        <Link href="/about">About</Link>
      </div>
      <div>
        <Image src="/logo-w.png" width="814" height="248"/>
        <h2 className={styles.subtitle}>
          A whole new way to explore the tree of life.
        </h2>
        { !isMobile && <Button style={{
          background: "#fff", color: "#000", marginLeft: "25px", padding: "15px"
        }} href="/builder">
          start building ➞
        </Button> }
      </div>
    </div>
  )
}
