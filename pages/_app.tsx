import Navbar from '@/components/Navbar/Navbar'
import type { AppProps } from 'next/app'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps : {session,...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
      <Navbar/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
