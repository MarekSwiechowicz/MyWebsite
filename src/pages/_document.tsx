import { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import Script from "next/script";

export default function Document({ locale }: { locale?: string }) {
  return (
    <Html lang={locale || "en"}>
      <Head />
      <body>
        <Script
          id="theme-switcher"
          strategy="beforeInteractive"
        >{`if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}`}</Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  return {
    ...initialProps,
    locale: ctx.locale || "en",
  };
};
