import { useState, useEffect } from 'react'
import styles from './LabelControl.module.css'

export default function LabelControl(props) {
  return (
    <div onClick={_ => props.setActive(!props.active)}
    className={[styles.control, props.active && styles.active].join(" ")}>
      {props.active ? "Using" : "Use"} common names when available
    </div>
  )
}
