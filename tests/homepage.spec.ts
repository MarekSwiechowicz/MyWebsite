import { test, expect } from "./fixtures/custom-fixtures";

test.describe("Homepage", () => {
  test("@smoke homepage has title Marek Święchowicz", async ({ homePage, page }) => {
    await homePage.goto();
    await expect(page).toHaveTitle("Marek Święchowicz");
  });

  test("@smoke can navigate to about page", async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.clickAbout();
    await expect(page).toHaveURL("/about");
  });

  test("displays all main homepage elements", async ({ homePage }) => {
    await homePage.goto();

    // Verify all main elements using page object methods
    await homePage.verifyAllMainElementsVisible();
  });

  test("Resume button navigates to about page", async ({ homePage, page }) => {
    await homePage.goto();

    await homePage.clickResumeButton();
    await expect(page).toHaveURL("/about");
  });

  test("Contact link opens email client", async ({ homePage }) => {
    await homePage.goto();

    await homePage.verifyContactLinkEmail();
  });

  test("can interact with social links and language switcher", async ({
    homePage,
    page,
  }) => {
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
});
