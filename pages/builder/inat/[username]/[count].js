import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../../../components/builder/Builder'
import { simplifyTaxon } from '../../../../lib/taxa'

const endpoint = "https://api.inaturalist.org/v1/observations"

export default function Builder(props) {
  const router = useRouter()
  const [ title, setTitle ] = useState(props.username + "'s Observation Tree")

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setTitle={setTitle} taxa={props.observations} title={title}/>
    </>
  )
}


async function getObservations(username, count) {
  let name = username
  const resp = await fetch(endpoint + "?per_page=" + count + "&user_id=" + username)
  const json = await resp.json()
  if (!json.results)
    return null;

  const results = json.results.filter(r => r.taxon)

  // Handle if user ID is used instead of username
  if (!isNaN(parseInt(username))) {
    name = results[0].user.name
  }

  const observations = results.map(r => {
    const inatPhoto = r.observation_photos.length !== 0 && r.observation_photos[0].photo.url
    let taxon = simplifyTaxon(r.taxon)

    if (inatPhoto) {
      taxon.photo = { url: inatPhoto, attribution: username }
      taxon.observation = r.id || true
    } else {
      taxon.obervation = false
    }
    return taxon
  })

  return { name, observations }
}


export async function getServerSideProps(context) {
  const username = context.query.username
  const count = context.query.count
  const { name, observations} = await getObservations(username, count)

  return {
    props: {
      observations: observations,
      username: name,
    }
  }
}
