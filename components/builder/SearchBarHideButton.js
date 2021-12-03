import styles from "./SearchBarHideButton.module.css"

export default function SearchBarHideButton({ setter, state }) {
  return (
    <div className={styles.button}
      style={{transform: state ? "rotate(180deg)" : "unset"}}
      onClick={_ => setter(!state)}
    >
      v
    </div>
  )
}
