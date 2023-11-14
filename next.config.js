/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pl'], // Replace 'en' and 'es' with your language codes
    defaultLocale: 'en', // Set your default locale
    localeDetection: false, // Optional: to disable automatic locale detection
  },
};

module.exports = nextConfig;
