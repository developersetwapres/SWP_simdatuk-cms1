import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import createEmotionCache from '../utils/createEmotionCache'
import { CacheProvider } from '@emotion/react'
import theme from '../utils/theme'
import { Provider } from 'react-redux'
import { initializeStore } from '../store'
import ModalResponse from '@/components/shared/Modal/ModalResponse'
import ModalCatchError from '@/components/core/ModalCatchError'
import Snackbar from '@/components/shared/Snackbar'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'swiper/css/pagination'
import '../styles/globals.css'

const __REDUX_STORE__ = '__REDUX_STORE__'

// * Get Or Create Redux Store
function getOrCreateStore() {
  const initialState = {}

  const isServer = typeof window === 'undefined'
  // Always make a new store if server, otherwise state is shared between request
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__REDUX_STORE__]) {
    window[__REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__REDUX_STORE__]
}

const clientSideEmotionCache = createEmotionCache()
function SETNEGCMS({
  pageProps,
  Component,
  emotionCache = clientSideEmotionCache
}) {
  const [loaded, setLoaded] = useState(false)
  const reduxStore = getOrCreateStore()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Fragment>
      <Provider store={reduxStore}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>SIMDATUK</title>
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
            <meta charSet='utf-8' />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {loaded && (
              <>
                <Snackbar />
                <Component {...pageProps} />
                <ModalResponse />
                <ModalCatchError />
              </>
            )}
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </Fragment>
  )
}

SETNEGCMS.propTypes = {
  pageProps: PropTypes.any,
  Component: PropTypes.any,
  emotionCache: PropTypes.any
}

export default SETNEGCMS
