import styles from './ParentMeme.module.css'

export default function ParentMeme(props) {

  const back = _ => {
    props.setParent(props.stack[props.stack.length - 1])
    props.setStack(props.stack.slice(0, -1))
  }

  console.log(props.stack)

  return props.parent && (
    <span className={styles.container}>
      {/* props.stack &&
        <div className={styles.last} onClick={back}>
         {props.stack[props.stack.length - 1].name}
        </div>
      */}
      <span>{props.parent} &nbsp;</span>
      <span style={{cursor: "pointer"}} onClick={() => props.setParent("")}>x</span>
    </span>
  )
}
