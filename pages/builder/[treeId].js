import Head from 'next/head'
import { useRouter } from 'next/router'
import TreeBuilder from '../../components/builder/Builder'

export default function Builder(props) {
  const [ title, setTitle ] = useState("My Tree")
  const router = useRouter()
  const treeId = router.query.treeId

  return (
    <>
      <Head>
        <title>Darwin - {tite}</title>
      </Head>
      <TreeBuilder setPageTitle={setTitle} treeId={treeId} />
    </>
  )
}
