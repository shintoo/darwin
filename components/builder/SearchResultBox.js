import { useState, useEffect } from 'react'
import SearchResultCard from './SearchResultCard'
import getTaxa from '../../lib/taxa'
import styles from './SearchResultBox.module.css'

export default function SearchResultBox(props) {
  const [ results, setResults ] = useState([])

  useEffect(() => {
    getTaxa(props.query, props.rank, props.parent)
      .then(taxa => {
        if (props.parent && taxa.length === 0) {
           return
        }
        setResults([])
        setResults(taxa)
      })
  }, [props.query, props.rank, props.parent])


  useEffect(() => props.setParent(null), [props.query, props.rank])

  const resultCards = results.map(taxa => <SearchResultCard key={taxa.id} taxa={taxa} setParent={props.setParent} addNode={props.addNode}/>)

  return (
    <div className={styles.container}>
      { resultCards }
    </div>
  )
}
