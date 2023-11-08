/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "profile.line-scdn.net",
      "www.israk.my",
      "ctfassets.imgix.net",
      "www.workspace365.com.au",
      "coandcoworks.ph",
    ],
  },
};
module.exports = nextConfig;
