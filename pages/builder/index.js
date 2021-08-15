import Head from 'next/head'
import { useState } from 'react'
import TreeBuilder from '../../components/builder/Builder'

export default function Builder(props) {
  const [ title, setTitle ] = useState("My Tree")
  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setPageTitle={setTitle}/>
    </>
  )
}
