import Head from 'next/head'
import styles from '../sass/Home.module.scss'
import Header from "../components/Header"
import AdvertismentCard from "../components/AdvertismentCard"
import { IProductResult } from "../state/actionTypes"
import { FC, useRef, useEffect, RefObject } from "react"
import ProductsSummary from "../components/ProductsSummary"
import useOnScreen from "../hooks/useOnScreen"
import dynamic from "next/dynamic"
import { Grid } from "@mui/material"
import SkeletonLoading from '../components/SkeletonLoading'
import { MongoClient } from "mongodb";

const Articles = dynamic(() => import("../components/Articles"));

interface IProducts {
  products: IProductResult[],
  countAll: number
}

const Home: FC<IProducts> = ({ products, countAll }) => {

  const articlesRef = useRef<HTMLDivElement>();
  const articlesRefValue = useOnScreen(articlesRef);
  const isArticlesRef = useRef(false);

  useEffect(() => {
    if (!isArticlesRef.current) {
      console.log("fire")
      isArticlesRef.current = true;
    }
  }, [articlesRefValue])

  return (
    <div className={styles.container}>
      <Head>
        <title>فروشگاه آنلاین گیاهان دارویی دست شفا</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AdvertismentCard />
      <ProductsSummary products={products} countAll={countAll} />
      <div ref={articlesRef as RefObject<HTMLDivElement>}>
        {isArticlesRef.current && <Articles />}
        {
          !isArticlesRef.current &&
          <Grid container>
            <SkeletonLoading itemCount={3} />
          </Grid>
        }
      </div>


    </div>
  )
}

export default Home;


export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:0izndCAkQc7254tD@cluster0.i2pejum.mongodb.net/dastshafa"
  );

  const db = client.db();
  const countAll = await db.collection("Plants").count();

  const productResult = await db
    .collection<IProductResult>("Plants")
    .find()
    .limit(4)
    .toArray();


  const products = productResult.map(({ id, img, title, description, benefical, weight, price, discount }: IProductResult) => ({
    id, img, title, description, benefical, weight, price, discount
  }));

  client.close();

  return {
    props: {
      products,
      countAll
    }
  }
}