import { useState, useEffect } from 'react'
import SearchResultCard from './SearchResultCard'
import styles from './SearchResultBox.module.css'

const taxaEndpoint = "https://api.inaturalist.org/v1/taxa"

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

  const resultCards = results.map(taxa => <SearchResultCard key={taxa.id} taxa={taxa} setParent={props.setParent}/>)

  return (
    <div className={styles.container}>
      { resultCards }
    </div>
  )
}

// Get a list of taxa matching the query from the iNaturalist API
// Args:
//   - query (str): Search text to match
//   - rank (str): Rank to match ("species", "family", "", etc.)
//   - parent (int): Only get taxa that are direct children of this parent taxon
// Returns:
//   - List of matched taxa in the form of:
//     [{ id: 41577,
//        name: "Humpback whale",
//        ancestors: [48460, 1, 2, 355675, ...]
//     }]
function getTaxa(query, rank, parent) {
  let url = taxaEndpoint

  if (parent) {
    url += "?parent_id=" + parent
  } else {
    url += "?q=" + query
    if (rank) {
      url += "&rank=" + rank
    }
  }


  console.log("args: ", query, rank, parent, " -- fetching ", url)

  return fetch(url)
    .then(resp => resp.ok ? resp.json() : null)
    .then(data => {
      console.log(data.total_results)
      if (!data.results)
        return [-1]
      return data.results.map(r => {
        return {
          id: r.id,
          photo: r.default_photo && {
            url: r.default_photo.medium_url,
            attribution: r.default_photo.attribution,
          },
          naming: {
            common_name: r.preferred_common_name !== "undefined" ? r.preferred_common_name : null,
            rank: r.rank,
            taxon: r.name
          }
        }
      })
    })
}
