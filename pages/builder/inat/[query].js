import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../../components/builder/Builder'

const endpoint = "https://api.inaturalist.org/v1/observations"

export default function Builder(props) {
  const router = useRouter()
  const [ ids, setIds] = useState([])
  const [ title, setTitle ] = useState("Loading...")
  const query = router.query.query
  if (!query)
    return null

  const [ username, count ] = router.query.query.split("-")

  if (title == "Loading...")
    setTitle(username)

  if (!username || !count)
    return null

  if (ids.length === 0)
    getObservations(username, count).then(i => {console.log("setting"); setIds(i)})

  console.log(ids)
  console.log("past", ids)

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setPageTitle={setTitle} ids={ids} title={username + "'s Observation Tree"}/>
    </>
  )
}


async function getObservations(username, count) {
  console.log("doing meme nao")
  return fetch(endpoint + "?per_page=" + count + "&user_login=" + username)
    .then(resp => {
      if (!resp.ok) {
        setTotalResults(0)
        return { results: null }
      }
      return resp.json()
    })
    .then(resp => {
        console.log(resp.total_results)
        if (!resp.results)
          return [-1];
        return resp.results.map(r => r.taxon.id)
    })
}
