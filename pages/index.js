import { useEffect } from 'react'
import Head from 'next/head'
import TitleCard from '../components/home/TitleCard'
import IntroductionCard from '../components/home/IntroductionCard'
import CallToActionCard from '../components/home/CallToActionCard'
import Footer from '../components/home/Footer'

export default function Home({ isMobile }) {
  useEffect(_ => {
    document.documentElement.style.backgroundColor = "#F0F5E0"
    document.body.style.backgroundColor = "#F0F5E0"
  }, [])

  return (
  <>
    <Head>
      <title>Darwin - 🌲 Phylogenetic trees made easy.</title>
    </Head>
    <TitleCard isMobile={isMobile} />
    <IntroductionCard isMobile={isMobile} />
    <CallToActionCard isMobile={isMobile} />
    <Footer isMobile={isMobile} />
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
