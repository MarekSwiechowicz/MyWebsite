import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
        <link rel='icon' href='/favicon.ico'></link>
      </Head>
      <main className='bg-light w-full min-h-screen'>
        <NavBar></NavBar>
        <Component {...pageProps} />
        <Footer></Footer>
      </main>
    </>
  );
}
