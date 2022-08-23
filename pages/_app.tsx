import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from "../sass/Loading.module.scss"
import Navbar from "../components/Navbar"
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from "react-redux"
import { store } from "../state"
import { ContextProvider } from "../context/ContextProvider"

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true))
    router.events.on("routeChangeComplete", () => setLoading(false))
  }, [router])

  const ConditionalRendering = () => {
    if (loading) {
      return <div className={styles.loading}>
        <CircularProgress color='success' className={styles.control} />
      </div>
    }

    let theme = createTheme({
      typography: {
        fontFamily: "IRANSansWeb"
      }
    })

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ContextProvider>
            <Navbar />
            <Component {...pageProps} />
          </ContextProvider>

        </ThemeProvider>
      </Provider>
    )
  }

  return ConditionalRendering()
}

export default MyApp
