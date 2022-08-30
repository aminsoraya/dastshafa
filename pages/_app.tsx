import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from "../sass/Loading.module.scss"
import Navbar from "../components/Navbar"
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from "react-redux"
import { store, persistor } from "../state"
import { ContextProvider } from "../context/ContextProvider"
import { PersistGate } from 'redux-persist/integration/react';
import Footer from "../components/Footer"

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ExcludePath = ["/login"]

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
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <ContextProvider>
              {!ExcludePath.includes(router.pathname) && <Navbar />}
              <Component {...pageProps} />
              {!ExcludePath.includes(router.pathname) && <footer className={styles.footer}>
                <Footer />
              </footer>}
            </ContextProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }

  return ConditionalRendering()
}

export default MyApp
