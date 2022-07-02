import '../styles/globals.css'
import {Header} from '../src/components/Header'
import type { AppProps } from 'next/app'
import {LoginStatus} from "../src/components/LoginStatus";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <LoginStatus />
    <Component {...pageProps} />
    </>
   )
}

export default MyApp
