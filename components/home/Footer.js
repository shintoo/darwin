import { useState, useEffect } from 'react'
import styles from './Footer.module.css'

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.label}>
        <a href="https://seanrapp.dev">Made by Sean Rapp</a>
        <a href="https://ko-fi.com/N4N474GKL">
          <img src="/kofi.png" className={styles.kofi} />
        </a>
      </div>
      <div className={styles.label}>
        <a href="https://www.inaturalist.org">Powered by iNaturalist</a>.
        <a href="https://www.inaturalist.org/donate">
          <span className={[styles.donate + " " + styles.button].join()}>Donate</span>
        </a>
      </div>
    </div>
  )
}
