import { useState, useEffect } from 'react'
import styles from './Footer.module.css'

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.label}>
        <a href="https://www.github.com/shintoo/darwin">Made by Sean Rapp</a>
      </div>
      <div className={styles.donate}>
      </div>
      <div className={styles.label}>
        <a href="https://www.inaturalist.org">Powered by iNaturalist</a>. <span style={{color: "#cc0000"}}><a href="https://www.inaturalist.org/donate">Donate</a></span>
      </div>
    </div>
  )
}
