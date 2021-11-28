import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import LogoButton from '../../components/ui/LogoButton'
import Footer from '../../components/home/Footer'

export default function About({isMobile}) {
  useEffect(_ => {
    document.documentElement.style.backgroundColor = "#FFFFFA"
    document.body.style.backgroundColor = "#FFFFFA"
  }, [])

  return (
    <>
    <Head>
      <title>Darwin - About</title>
    </Head>
    <div className="about-nav">
      <LogoButton height={isMobile ? 28 : 32}/>
      {!isMobile && <Link href="/builder"><span className="about-nav-builder">Tree Builder</span></Link> }
    </div>
    <div className="about-section">
      <h1>What is Darwin?</h1>
      <div className="about-subsection">
        <p style={{textAlign: "center", fontWeight: "bold"}}>
          Visualize taxonomy easily with Darwin. Don't worry about phyla, subclasses, infraorders, and so on - we take care of that for you.
        </p>
        <Image src="/transform.png" width={600} height={300} alt="tree diagram"/>
        <p style={{textAlign: "center", fontWeight: "bold", marginTop: "2em"}}>Use Darwin to build a phylogenetic tree of different taxa, as relationships and missing links are created automatically.</p>
      </div>
    </div>

    <div className="about-section">
      <h2>FAQ</h2>
      <div className="about-subsection">
        <div className="about-card">
          <span className="faq-q">What is a taxon?</span>
          <p className="faq-a">
            A &quot;taxon&quot; (or &quot;taxa&quot; plural) is a node on the tree of life. It is a group that includes all of the organisms
            classified in it. Consider the blue whale, or <i>Balaenoptera musculus</i>.
            It&apos;s genus, <i>balaenoptera</i>, is one taxon that it belongs to. It also belongs to the class taxon <i>Mammalia</i>, as it is a mammal.
          </p>
        </div>

        <div className="about-card">
          <span className="faq-q">How do I connect to my iNaturalist?</span>
          <p className="faq-a">
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row"}}>
              <p>
                No login to iNaturalist is needed. Simply select the iNaturalist icon in the Tree Builder, enter your username, and the number of
                observations you wish to load. For example, if you enter <i>10</i>, your <i>latest</i> 10 observations will be loaded.
              </p>
              <Image src="/inat-button.png" width={138 / (isMobile ? 2 : 1)} height={150 / (isMobile ? 2 : 1)} alt="iNat button"/>
            </div>
          </p>
        </div>

        <div className="about-card">
          <span className="faq-q">How do I save my tree?</span>
          <p className="faq-a">
            To save a tree, select the <span className="about-share">Share <Image src="/share.png" width={14} height={14} /></span> button and copy the tree URL. To access the tree in the future,
            use this URL - all of the tree data is encoded in the link. There is no database (currently) storing user-created trees, but this may be added in the future.
          </p>
        </div>

        <div className="about-card">
          <span className="faq-q">Will mobile be supported?</span>
          <p className="faq-a">
            Mobile support is currently in development. You can support the effort by visiting my <span className="about-support"><Link href="https://ko-fi.com/seancreates">ko-fi page</Link></span>.
          </p>
        </div>

      </div>
    </div>
    <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const UA = context.req.headers['user-agent']
  const mobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ))

  return {props: {isMobile: mobile}};
}
