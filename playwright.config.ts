import { defineConfig } from "@playwright/test";

const PROD_BASE_URL =
  process.env.PROD_BASE_URL || "https://www.marekswiechowicz.pl/";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
    {
      name: "prod-smoke",
      use: { baseURL: PROD_BASE_URL, browserName: "chromium" },
      grep: /@smoke/,
      retries: 0,
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000,
  },
});
