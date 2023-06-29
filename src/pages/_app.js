import "@/styles/globals.css";
// import { useEffect } from 'react';
// import { registerServiceWorker, promptInstall } from '../../public/registerServiceWorker';
export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   registerServiceWorker();
  //   promptInstall();
  // }, []);

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/img/favicon.ico" />
      <meta name="theme-color" content="#E53012" />
      <Component {...pageProps} />
    </>
  );
}
