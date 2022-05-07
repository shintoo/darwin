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
  const [ stepNumber, setStepNumber ] = useState(0)
  const [ opened, setOpened ] = useState(false)
  const [ hint, setHint ] = useState(true)

  const steps = frames.map(({image, content}) => (
    <>
      <div className={styles.imagecontainer}>
        <img src={image} className={styles.image}/>
      </div>
      <div className={styles.text}>{content}</div>
    </>
  ))

  const handlePageChange = op => {
    if (op == "next" && stepNumber == frames.length - 1) {
      setOpened(false);
      setStepNumber(0);
    }
    else
      setStepNumber(i => op == "next" ? i + 1 : i - 1)
  }

  //setTimeout(_ => setHint(false), 15000); 

  const close = _ => {
    setOpened(false);
    setStepNumber(0);
  }

  return (
    <>
    { hint ?
      <div className={styles.hint} onClick={_ => {setHint(false); setOpened(true)}}>
        First time? Click here to start the tutorial. 
        <div
          style={{position: "absolute", top: "5px", right: "12px", cursor: "pointer", color: "#ccc"}}
          onClick={e => {e.stopPropagation();  setHint(false)}}>
          &ndash;
        </div>
      </div>
     :
      <div className={styles.showhide} onClick={_ => setOpened(!opened)}>?</div>
    }
    { opened && 
    <Modal close={close} style={{display: "flex", justifyContent: "right", flexDirection: "column", minWidth: "500px"}}>
        <div className={styles.counter}>{(stepNumber + 1) + "/" + frames.length}</div>
        {steps[stepNumber]}
        <div className={styles.controls}>
          {stepNumber !== frames.length - 1 && <span className={styles.skip} onClick={close}>skip</span>}

          { stepNumber != 0 &&
          <Button onClick={_ => handlePageChange("prev")} style={{
            fontSize: "1em",
            boxShadow: "unset",
            width: "100px",
            marginTop: "1em",
            background: "white",
            border: "1px solid #8CAB73",
            color: "#8CAB73",
            marginLeft: "auto",
            marginRight: "1rem",

          }}>
            Previous
          </Button>
          }
          <Button onClick={_ => handlePageChange("next")} style={{
            fontSize: "1em",
            boxShadow: "unset",
            width: "100px",
            marginTop: "1em"
          }}>
            {stepNumber == frames.length - 1 ? "Done" : "Next"}
          </Button>
        </div>
      </Modal>
    }
    </>
  )
 
}
