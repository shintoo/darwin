import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../../components/builder/Builder'
import getEBirdChecklist from '../../../lib/ebird'

export default function Builder(props) {
  const [ title, setTitle ] = useState("Loading...")

  useEffect(_ => {
    setTitle(`${props.checklist.userName}'s ${props.checklist.location} eBird Checklist`)
  }, [props.checklist])

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setTitle={setTitle} taxa={props.checklist.taxa} title={title}/>
    </>
  )
}

export async function getServerSideProps(context) {
  const checklist = await getEBirdChecklist(context.params.query, process.env.EBIRD_TOKEN)

  return {
    props: {
      checklist: checklist,
    }
  }
}
