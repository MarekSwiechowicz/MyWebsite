import { appWithTranslation } from "next-i18next";
import { Footer } from "@/components/Footer";
import NavBar from "@/components/Navbar/NavBar";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Facebook from "@/components/Facebook";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <main
        className={`bg-light w-full min-h-screen dark:bg-dark
       ${montserrat.variable} font-montserrat`}
      >
        <ThemeProvider attribute="class">
          <NavBar></NavBar>
          <AnimatePresence mode="wait">
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
          <Facebook></Facebook>
          <Footer></Footer>
        </ThemeProvider>
      </main>
    </>
  );
}

export default appWithTranslation(MyApp);
