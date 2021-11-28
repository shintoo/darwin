import styles from './ParentMeme.module.css'

export default function ParentMeme(props) {

  const back = _ => {
    props.setStack(props.stack.slice(0, -1))
  }

  return props.stack.length > 0 ? (
    <span className={styles.container}>
      { props.stack.length > 1 &&
        <span className={styles.prev} onClick={back}>
         &lt;&nbsp;&nbsp;
        </span>
      }
      <span>{props.stack[props.stack.length - 1].name} &nbsp;</span>
      <span style={{cursor: "pointer"}} onClick={() => { props.setStack([]) }}>x</span>
    </span>
  ) : null
}
