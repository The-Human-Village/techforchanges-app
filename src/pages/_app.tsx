import { Layout } from '@/layout/layout'
import '@/styles/globals.css'
import theme from '@/theme/index'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import mixpanel from 'mixpanel-browser'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  useEffect(() => {
    // Check if the user identifier exists in local storage
    let userId = localStorage.getItem('user_id')

    // If no user identifier exists, generate a new one and store it
    if (!userId) {
      userId = uuidv4() // Generate a UUID
      localStorage.setItem('user_id', userId)
    }

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY, { debug: true })
    mixpanel.set_config({ persistence: 'localStorage' })
    mixpanel.identify(userId)
    mixpanel.people.set({ userId: userId })
    mixpanel.track('page_view', { page: window.location.pathname })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>The Human Village</title>
            <meta name="description" content="The Human Village" />
            <link rel="icon" href="/favicon.jpg" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
