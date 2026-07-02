import styles from './ParentMeme.module.css'
import { ChevronLeftIcon, CloseIcon } from './Icons'

export default function ParentMeme(props) {

  const back = _ => {
    props.setStack(props.stack.slice(0, -1))
  }

  const taxon = props.stack[props.stack.length - 1]

  return props.stack.length > 0 ? <>
    { props.stack.length > 1 &&
      <div className={[styles.container, styles.prev].join(" ")} onClick={back}>
       <ChevronLeftIcon />
      </div>
    }
    <span className={styles.container}>
      <span className={styles.rank}>{taxon.rank}</span> <span>{taxon.name}</span> &nbsp;
      <span style={{cursor: "pointer"}} onClick={() => { props.setStack([]) }}><CloseIcon /></span>
    </span>
  </> : null
}
