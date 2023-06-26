/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const withOffline = require("next-offline");

module.exports = withOffline({
  target: "serverless",
  transformManifest: (manifest) => ["/"].concat(manifest),
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
});

module.exports = { withPWA, withOffline };
