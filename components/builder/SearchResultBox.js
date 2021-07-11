import { useState, useEffect } from 'react'
import SearchResultCard from './SearchResultCard'
import styles from './SearchResultBox.module.css'

const taxaEndpoint = "https://api.inaturalist.org/v1/taxa"

export default function SearchResultBox(props) {
  const [ results, setResults ] = useState([])

  useEffect(() => {
    setResults([])
    const taxa = getTaxa(props.query)
    console.log("updating results for query ", props.query)
    setResults(taxa)
  }, [props.query])

  const resultCards = results.map(taxa => <SearchResultCard key={taxa.id} taxa={taxa} />)

  return (
    <div className={styles.container}>
      { resultCards }
    </div>
  )
}

function getTaxa(query, rank) {
  // List of {taxonId: {name: "Eastern Cottontail", "image": "http...", ancestors: [...]}, ...}
/*  return fetch(
    taxaEndpoint
    + "?q=" + query
    + rank ? "&rank
  )*/
  // placeholder (whales!)
  return [
    {
      id: 41566,
      name: "Humpback whale",
      image: "https://inaturalist-open-data.s3.amazonaws.com/photos/2291801/medium.jpg?1440209486",
      ancestors: [
        48460,
        1,
        2,
        355675,
        40151,
        848317,
        848320,
        848324,
        152870,
        925158,
        152871,
        424321,
        41546,
        41565,
        41566
      ]
    },{
      id: 41521,
      name: "Killer whale",
      image: "https://inaturalist-open-data.s3.amazonaws.com/photos/14363326/medium.jpeg?1521702304",
      ancestors: [
        48460,
        1,
        2,
        355675,
        40151,
        848317,
        848320,
        848324,
        152870,
        925158,
        152871,
        424322,
        41479,
        41520,
        41521
      ]
    },{
      id: 41478,
      name: "Gray whale",
      image: "https://inaturalist-open-data.s3.amazonaws.com/photos/9393720/medium.jpeg?1501366539",
      ancestors: [
        48460,
        1,
        2,
        355675,
        40151,
        848317,
        848320,
        848324,
        152870,
        925158,
        152871,
        424321,
        41476,
        41477,
        41478
      ]
    },{
      id: 52188,
      name: "Whale shark",
      image: "https://static.inaturalist.org/photos/12122747/medium.jpg?1512019144",
      ancestors: [
        48460,
        1,
        2,
        355675,
        47273,
        505362,
        551307,
        551308,
        49967,
        52189,
        48841,
        52188
      ]
     }
  ]
}
