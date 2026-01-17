/**
 * Example test file demonstrating the use of custom fixtures
 * 
 * This file shows how to use the custom fixtures (homePage, aboutPage, projectsPage)
 * instead of manually instantiating page objects in each test.
 * 
 * To use this pattern, import from custom-fixtures instead of @playwright/test:
 * import { test, expect } from "./fixtures/custom-fixtures";
 */

import { test, expect } from "./fixtures/custom-fixtures";

test.describe("Example: Using Custom Fixtures", () => {
  test("homepage elements using fixture", async ({ homePage, page }) => {
    // homePage is automatically provided by the fixture
    await homePage.goto();
    await homePage.verifyAllMainElementsVisible();
    await expect(page).toHaveTitle("Marek Święchowicz");
  });

  test("navigate between pages using fixtures", async ({
    homePage,
    aboutPage,
    projectsPage,
    page,
  }) => {
    // Start at homepage
    await homePage.goto();
    await expect(page).toHaveURL("/");

    // Navigate to about page
    await homePage.clickAbout();
    await expect(page).toHaveURL("/about");
    await aboutPage.verifyAllSectionsPresent();

    // Navigate to projects page
    await projectsPage.goto();
    await expect(page).toHaveURL("/projects");
    await projectsPage.verifyFeaturedProjectsVisible();

    // Navigate back to home
    await homePage.goto();
    await expect(page).toHaveURL("/");
  });

  test("about page sections using fixture", async ({ aboutPage }) => {
    await aboutPage.goto();
    
    // Verify all sections
    await aboutPage.verifyAllSectionsPresent();
    
    // Check specific sections
    await expect(await aboutPage.isBiographyVisible()).toBeTruthy();
    await expect(await aboutPage.isProfileImageVisible()).toBeTruthy();
    await expect(await aboutPage.areAnimatedNumbersVisible()).toBeTruthy();
  });

  test("projects page using fixture", async ({ projectsPage }) => {
    await projectsPage.goto();
    
    // Verify projects
    await projectsPage.verifyCKEditorProjectVisible();
    await projectsPage.verifyPortfolioProjectVisible();
    await projectsPage.verifyTMobileProjectVisible();
    
    // Verify project links
    await projectsPage.verifyProjectLinkExists(/REST API and CKEditor 5/i);
  });
});
