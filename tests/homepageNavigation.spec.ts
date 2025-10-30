import { test, expect } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage";

// First test: title verification

test("@smoke homepage has title Marek Święchowicz", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(page).toHaveTitle("Marek Święchowicz");
});

test("@smoke can navigate to about page", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickAbout();
  await expect(page).toHaveURL("/about");
});

test("test", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("http://localhost:3000/");
  const page1 = await homePage.clickGitHub();
  const page2 = await homePage.clickLinkedIn();
  await homePage.clickFirstButton();
  await homePage.clickFirstButton();
  await homePage.changeLanguage("PL");
  await homePage.changeLanguage("EN");
  await homePage.clickAbout();
});
