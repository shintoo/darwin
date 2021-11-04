import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './TitleCard.module.css'
import Button from '../ui/Button'

export default function TitleCard(props) {
  const [ accent, setAccent ] = useState("#FFF8")
  const backgrounds = ["ladybeetle", "bee", "moss", "leafhopper", "moth", "plant1", "mushroom", "babyshroom", "leaf"]
  const selected = backgrounds[Math.floor(Math.random()*backgrounds.length)]
  const background = 'url(' + selected + '.jpeg) no-repeat center center fixed'

  return (
    <div className={styles.container} style={{ background: background, backgroundSize: "cover" }}>
      <div className={styles.toplinks}>
        <Link href="/about">About</Link>
      </div>
      <div>
        <img src="logo-w.png" />
        <h2 className={styles.subtitle}>
          Build<span className={styles.lightgreen}>.</span>{" "}
          Share<span className={styles.darkgreen}>.</span>{" "}
          <span className={styles.primary}>Discover.</span>
        </h2>
        <h3 className={styles.subsubtitle}>
          A whole new way to explore the tree of life.
        </h3>
        <Button href="/builder">start building ➞</Button>
      </div>
    {/*
      <img
        className={styles.meme}
        src={"/meme.png"}
      />
    */}
    </div>
  )
}
