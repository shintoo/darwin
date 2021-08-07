import styles from './ParentMeme.module.css'

export default function ParentMeme(props) {
  return props.parent && (
    <span className={styles.container}>
      <span>{props.parent} &nbsp;</span>
      <span onClick={() => props.setParent("")}>x</span>
    </span>
  )
}
