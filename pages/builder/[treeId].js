import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TreeBuilder from '../../components/builder/Builder'

export default function Builder(props) {
  const [ title, setTitle ] = useState("Loading...")
  const router = useRouter()
  const treeId = router.query.treeId

  if (treeId && title == "Loading...")
    setTitle(treeId.split("-")[0].replace(/_/g, " "))

  return (
    <>
      <Head>
        <title>Darwin - {title}</title>
      </Head>
      <TreeBuilder title={title} setTitle={setTitle} treeId={treeId} />
    </>
  )
}
