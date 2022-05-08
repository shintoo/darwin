import { useState, useEffect, useRef } from 'react'
import React from 'react'
import SearchResultCard from './SearchResultCard'
import ScrollButton from './SearchResultBoxScrollButton'
import getTaxa from '../../lib/taxa'
import debounce from '../../lib/input'
import styles from './SearchResultBox.module.css'

export default function SearchResultBox(props) {
  const [ results, setResults ] = useState([])
  const [ pagesLoaded, setPagesLoaded ] = useState(0)
  const [ scrolled, setScrolled ] = useState(false)

  const boxRef = useRef(null)

  useEffect(() => {
    setResults([])
    getTaxa(props.query, props.rank, props.parent?.id, null, 0, 20)
      .then(taxa => {
        if (props.parent && taxa.length === 0) {
           return
        }
        setResults(taxa)
        setPagesLoaded(1)
      })
  }, [props.query, props.rank, props.parent])

  useEffect(() => {
    props.clearParentStack()
  }, [props.query, props.rank])

  const wheelHandler = e => {
    e.preventDefault()
    boxRef.current.scrollLeft += e.deltaY*4
    if (boxRef.current.scrollLeft > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
    console.log("wheel scroll: ", e.deltaY)
  }

  // make sure getTaxa can take a page,
  // keep a currentPagesLoaded state or something
  // do something to call it etc, interval, effect, something

  const resultCards = results.map(taxa => <SearchResultCard key={taxa.id} taxa={taxa} setParent={props.setParent} addNode={props.addNode}/>)

  const scrollHandler = debounce(_ => {
    const box = document.getElementById("search-result-box")
    const atBottom = box.scrollWidth - box.scrollLeft == box.clientWidth
    console.log(box.scrollWidth, box.scrollLeft, box.clientWidth)

    if (atBottom) {
      console.log("scrollHandler: ", props.query, props.rank, props.parent?.id, pagesLoaded + 1)
      getTaxa(props.query, props.rank, props.parent?.id, null, pagesLoaded + 1, 20)
        .then(taxa => {
          if (taxa.length === 0) {
            return 
          }

          taxa = taxa.filter(taxon => results.filter(t => t.id == taxon.id).length == 0)

          for (let i = 0; i < taxa.length; i++) {
            console.log(`id: ${taxa[i].id}, included: ${results.includes(taxa[i])}`)
          }

          results.push(...taxa)
          setResults([...results])
          setPagesLoaded(p => p + 1)
        })
    }
  }, 1000)

  return (
    <div ref={boxRef} id="search-result-box" onWheel={wheelHandler} onScroll={scrollHandler} className={styles.container}>
      {scrolled && <ScrollButton boxRef={boxRef} direction="left" setScrolled={setScrolled} /> }
      { resultCards }
      <ScrollButton boxRef={boxRef} direction="right" setScrolled={setScrolled} />
    </div>
  )
}
