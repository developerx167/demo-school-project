import Navbar from '@/components/Navbar/Navbar'
import type { AppProps } from 'next/app'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
export default function App({ Component, pageProps : {session,...pageProps} }: AppProps) {
  const queryClient = new QueryClient();
  return(
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools/>}
            <Navbar/>
            <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
  )
}
