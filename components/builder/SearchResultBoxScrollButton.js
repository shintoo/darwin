import styles from "./SearchResultBoxScrollButton.module.css"

export default function SearchResultBoxScrollButton({direction, boxRef, setScrolled}) {
  const isLeft = direction == "left"
  let delta = 600

  const scroll = _ => {
    if (!isLeft) {
      setScrolled(true)
    }
    else {
      delta = -600
    }
    boxRef.current.scrollBy({
      left: delta, 
      top: 0,
      behavior: "smooth",
    })

    if (boxRef.current.scrollLeft + delta <= 0) {
      setScrolled(false)
    }

  }
  return (
    <div
      onClick={scroll}
      className={styles.scrollbutton + " " + (isLeft ? styles.left : styles.right)}
    >
      {isLeft ? "<" : ">"}
    </div>
  )
}
