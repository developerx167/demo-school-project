import Navbar from '@/components/Navbar/Navbar'
import type { AppProps } from 'next/app'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Navbar/>
      <Component {...pageProps} />
    </>
  )
}
