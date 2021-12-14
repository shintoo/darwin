import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../../components/builder/Builder'
import getEBirdChecklist from '../../../lib/ebird'

export default function Builder(props) {
  const router = useRouter()
  const [ checklist, setChecklist] = useState([])
  const [ title, setTitle ] = useState("Loading...")
  const query = router.query.query

  useEffect(_ => {
    if (!router.query.query)
      return null
    console.log("Doing effect that gets ebird checklist")
    getEBirdChecklist(router.query.query).then(setChecklist)
    setTitle("eBird Checklist "+router.query.query)
  }, [router])

  useEffect(_ => {
    setTitle(`${checklist.userName}'s ${checklist.location} eBird Checklist`)
  }, [checklist])

  if (!router.query.query)
    return null

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setTitle={setTitle} taxa={checklist.taxa} title={title}/>
    </>
  )
}
