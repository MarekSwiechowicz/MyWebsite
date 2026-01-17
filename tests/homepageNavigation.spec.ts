import { test, expect } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage";
import { AboutPage } from "./page-objects/AboutPage";

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

test("can interact with social links and language switcher", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  // Test external links open in new tabs
  const githubPage = await homePage.clickGitHub();
  await expect(githubPage).toHaveURL(/github\.com/);
  await githubPage.close();

  const linkedInPage = await homePage.clickLinkedIn();
  await expect(linkedInPage).toHaveURL(/linkedin\.com/);
  await linkedInPage.close();

  // Test language switcher
  await homePage.changeLanguage("PL");
  await expect(page).toHaveURL(/\/$/);
  await homePage.changeLanguage("EN");
  await expect(page).toHaveURL(/\/$/);

  // Test navigation
  await homePage.clickAbout();
  await expect(page).toHaveURL("/about");
});
