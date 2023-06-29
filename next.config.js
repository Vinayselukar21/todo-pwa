const withPWA = require("next-pwa")({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

const withOffline = require("next-offline")({
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|css)/,
        handler: "CacheFirst",
        options: {
          cacheName: "assets-cache",
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^http.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "http-cache",
        },
      },
    ],
  },
});

module.exports = { withPWA, withOffline };
