import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
    <Head>
      <title>Darwin - About</title>
    </Head>
    <div>
      <h1>About Darwin</h1>
      <p>Darwin is developed by <a href="seanrapp.dev"a>Sean Rapp (me)</a>, and the source code
      is available <a href="https://github.com/shintoo/darwin">here</a>.
      </p>
      <h2>FAQ</h2>
      <h3>Where are the Domains? Eukarya?</h3>
        <p>Darwin uses the phylogenetic structure provided by
           <a href="https://www.inaturalist.org/">iNaturalist</a>,
           a platform for crowdsourcing observation and identification.</p>

    </div>
    <Link href="/builder/Finding_Nemo-cBC-yw8-chP-y2X-1uwH-ajF-1-lFo-2CjX-27t0-dex-3jbk-dE7-17O-1OvY-1uzG-cmV-1egC">Finding Nemo tree</Link>
    </>
  )
}
