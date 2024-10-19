import "../app/globals.css";
import type { AppProps } from 'next/app';
import Head from 'next/head'; // 引入 Head 组件

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 在这里引入 Font Awesome 的 CDN */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;