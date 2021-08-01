import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../components/builder/Builder'

export default function Builder(props) {
  const router = useRouter()
  const treeId = router.query.treeId

  return (
    <>
      <Head>
        <title>Darwin - Tree Builder</title>
      </Head>
      <TreeBuilder treeId={treeId} />
    </>
  )
}
