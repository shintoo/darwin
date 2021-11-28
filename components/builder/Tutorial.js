import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import styles from './Tutorial.module.css'

const frames = [
  { image: null, content: "Let's learn how to build trees with Darwin." },
  { image: "/tutorial/1.gif", content: "Type in the search bar to find a taxon..." },
  { image: "/tutorial/2.gif", content: "Click on a taxon to show its children." },
  { image: "/tutorial/3.gif", content: "You can also select a rank to view only species, for example." },
  { image: "/tutorial/4.gif", content: <>Select the <span className={styles.plus}>+</span> button to add the taxon to the canvas.</> },
  { image: "/tutorial/5.gif", content: <>Delete a taxon from the canvas with the <span style={{color: "red"}}>X</span> button.</> },
  { image: "/tutorial/6.gif", content: "Pan around the canvas for a better view." },
  { image: "/tutorial/7.gif", content: "Zoom in, out, or reset the zoom." },
  { image: "/tutorial/7.5.gif", content: "Display common names or scientific names." },
  { image: "/tutorial/8.gif", content: "Name your tree!" },
  { image: "/tutorial/9.gif", content: "Share your tree with the world." },
  { image: null, content: <div style={{width: "100%", textAlign: "center"}}>Have fun!</div> },
]

export default function Tutorial(props) {
  const [ stepNumber, setStepNumber ] = useState(0);
  const [ opened, setOpened ] = useState(true)

  const steps = frames.map(({image, content}) => (
    <>
      <img src={image} className={styles.image}/>
      <div className={styles.text}>{content}</div>
    </>
  ))

  const handleNext = _ => {
    if (stepNumber == frames.length - 1)
      setOpened(false);
    else
      setStepNumber(i => i + 1)
  }

  if (!opened)
    return ""

  return (
    <Modal close={_=>setOpened(false)} style={{display: "flex", justifyContent: "right", flexDirection: "column"}}>
      <div className={styles.counter}>{(stepNumber + 1) + "/" + frames.length}</div>
      {steps[stepNumber]}
      <div className={styles.controls}>
        {stepNumber !== frames.length - 1 && <span className={styles.skip} onClick={_=>setOpened(false)}>skip</span>}
        <Button onClick={handleNext} style={{
          fontSize: "1em",
          boxShadow: "unset",
          width: "100px",
          marginTop: "1em"
        }}>
          {stepNumber == frames.length - 1 ? "Done" : "Next"}
        </Button>
      </div>
    </Modal>
  )
 
}
