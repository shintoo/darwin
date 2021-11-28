import styles from './ParentMeme.module.css'

export default function ParentMeme(props) {

  const back = _ => {
    props.setStack(props.stack.slice(0, -1))
  }

  return props.stack.length > 0 ? <>
    { props.stack.length > 1 &&
      <div className={[styles.container, styles.prev].join(" ")} onClick={back}>
       &lt;
      </div>
    }
    <span className={styles.container}>
      <span>{props.stack[props.stack.length - 1].name} &nbsp;</span>
      <span style={{cursor: "pointer"}} onClick={() => { props.setStack([]) }}>x</span>
    </span>
  </> : null
}
