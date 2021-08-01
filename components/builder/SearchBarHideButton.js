import styles from "./SearchBarHideButton.module.css"

export default function SearchBarHideButton({ setter, state }) {
  return (
    <div className={styles.button}
      onClick={_ => setter(!state)}
    >
      {state ? "Show Search" : "Hide Search"}
    </div>
  )
}
