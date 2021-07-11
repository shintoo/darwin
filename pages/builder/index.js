import Head from 'next/head'
import TreeBuilder from '../../components/builder/Builder'

export default function Builder(props) {
  return (
    <>
      <Head>
        <title>Darwin - Tree Builder</title>
      </Head>
      <TreeBuilder />
    </>
  )
}
