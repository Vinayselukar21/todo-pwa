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
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <Component {...pageProps} />
    </>
  );
}
