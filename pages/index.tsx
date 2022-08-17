import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../sass/Home.module.scss'
import Header from "../components/Header"
import AdvertismentCard from "../components/AdvertismentCard"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>فروشگاه آنلاین گیاهان دارویی دست شفا</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AdvertismentCard />


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
