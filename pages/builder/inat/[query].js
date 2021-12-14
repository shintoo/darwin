import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../../components/builder/Builder'

const endpoint = "https://api.inaturalist.org/v1/observations"

export default function Builder(props) {
  const router = useRouter()
  const [ ids, setIds] = useState([])
  const [ photos, setPhotos ] = useState([])
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
    getObservations(username, count).then(os => {
      console.log("setting");
      // Have to set photos first; setting ids triggers starts the rerender that triggers
      // the tree build, so if the rerender caused by setting photos happens after that,
      // the photos are ignored (since the tree starts building if there are photos or not)
      setPhotos(os.map(o => o.image))
      setIds(os.map(o => o.id));
    })

  console.log(ids)
  console.log("past", ids)

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setTitle={setTitle} ids={ids} photos={photos} title={username + "'s Observation Tree"}/>
    </>
  )
}


async function getObservations(username, count) {
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
        return resp.results.filter(r => r.taxon).map(r => {
          const observation_photo = r.observation_photos.length !== 0 && r.observation_photos[0].photo.url
          return {id: r.taxon.id, image: observation_photo}
        })
    })
}
