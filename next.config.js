// Import i18n config from next-i18next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  // ... other configurations
};

module.exports = nextConfig;
