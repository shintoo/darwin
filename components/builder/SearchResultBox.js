import { useState, useEffect } from 'react'
import SearchResultCard from './SearchResultCard'
import getTaxa from '../../lib/taxa'
import debounce from '../../lib/input'
import styles from './SearchResultBox.module.css'

export default function SearchResultBox(props) {
  const [ results, setResults ] = useState([])
  const [ pagesLoaded, setPagesLoaded ] = useState(0)

  useEffect(() => {
    getTaxa(props.query, props.rank, props.parent)
      .then(taxa => {
        if (props.parent && taxa.length === 0) {
           return
        }
        setResults([])
        setResults(taxa)
        setPagesLoaded(1)
      })
  }, [props.query, props.rank, props.parent])

  useEffect(() => props.setParent(null), [props.query, props.rank])


  // make sure getTaxa can take a page,
  // keep a currentPagesLoaded state or something
  // do something to call it etc, interval, effect, something

  const resultCards = results.map(taxa => <SearchResultCard key={taxa.id} taxa={taxa} setParent={props.setParent} addNode={props.addNode}/>)

  const scrollHandler = debounce(_ => {
    if (document.getElementById("search-result-box").getBoundingClientRect().right <= window.innerWidth) {
      console.log("scrollHandler: ", props.query, props.rank, props.parent, pagesLoaded + 1)
      getTaxa(props.query, props.rank, props.parent, null, pagesLoaded + 1, 10)
        .then(taxa => {
          if (taxa.length === 0) {
            return 
          }
          results.push(...taxa)
          setResults([...results])
          setPagesLoaded(pagesLoaded + 1)
        })
    }
  }, 1000)

  return (
    <div id="search-result-box" onScroll={scrollHandler} className={styles.container}>
      { resultCards }
    </div>
  )
}
