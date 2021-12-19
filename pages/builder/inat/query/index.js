import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../../../components/builder/Builder'
import { simplifyTaxon } from '../../../../lib/taxa'
import { createQueryString } from '../../../../lib/serialize'

const endpoint = "https://api.inaturalist.org/v1/observations"

export default function Builder(props) {
  const router = useRouter()
  const [ title, setTitle ] = useState("My Tree")

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setTitle={setTitle} taxa={props.observations} title={title}/>
    </>
  )
}


async function getObservations(query, count) {
  const queryString = endpoint + "?" + query + "&per_page=" + count 
  const resp = await fetch(queryString)
  const json = await resp.json()
  if (!json.results)
    return null;

  const results = json.results.filter(r => r.taxon)

  const taxa = results.map(r => {
    const inatPhoto = r.observation_photos.length !== 0 && r.observation_photos[0].photo.url
    let taxon = simplifyTaxon(r.taxon)

    if (inatPhoto) {
      taxon.photo = { url: inatPhoto, attribution: r.observation_photos[0].photo.attribution }
      taxon.observation = r.id || true
    } else {
      taxon.obervation = false
    }
    return taxon
  })

  return taxa
}


export async function getServerSideProps(context) {
  let { count, ...iNatQuery } = context.query
  if (!count) {
    count = 10
  }
  const query = createQueryString(iNatQuery)
  const observations = await getObservations(query, count)

  return {
    props: {
      observations: observations,
    }
  }
}
