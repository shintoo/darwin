import styles from './Modal.module.css'

export default function Modal(props) {
  return (
    <div className={styles.background} onClick={props.close}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} style={props.style}>
        {props.children}
      </div>
    </div>
  )
}
