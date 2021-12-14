import { useState } from 'react'
import Head from 'next/head'
import TreeBuilder from '../../components/builder/Builder'

export default function Builder(props) {
  const [ title, setTitle ] = useState("My Tree")

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder setTitle={setTitle} title={title} />
    </>
  )
}
