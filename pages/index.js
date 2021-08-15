import Head from 'next/head'
import TitleCard from '../components/home/TitleCard'
import ImageShow from '../components/home/ImageShow'
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
    {/*    <ImageShow /> */}
    <CallToActionCard />
    <Footer />
  </>
  )
}
