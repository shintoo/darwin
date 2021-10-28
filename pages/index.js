import Head from 'next/head'
import TitleCard from '../components/home/TitleCard'
import IntroductionCard from '../components/home/IntroductionCard'
import CallToActionCard from '../components/home/CallToActionCard'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
  <>
    <Head>
      <title>Darwin</title>
    </Head>
    <TitleCard />
    <IntroductionCard />
    <CallToActionCard />
    <Footer />
  </>
  )
}
