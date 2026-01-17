import { test, expect } from "./fixtures/custom-fixtures";
import { waitForAnimations } from "./utils/test-helpers";

test.describe("Projects Page", () => {
  test("displays all project cards", async ({ projectsPage, page }) => {
    await projectsPage.goto();

    // Check that animated heading container exists
    const headingContainer = page.locator("h1").first();
    await expect(headingContainer).toBeVisible();

    // Verify specific projects using page object methods
    await projectsPage.verifyCKEditorProjectVisible();
    await projectsPage.verifyPortfolioProjectVisible();
    await projectsPage.verifyTMobileProjectVisible();
    await projectsPage.verifyTMexpressProjectVisible();

    // Check that project links exist
    const allLinks = await projectsPage.getAllProjectLinks();
    const linkCount = await allLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test("project links are clickable", async ({ projectsPage, page }) => {
    await projectsPage.goto();

    await waitForAnimations(page, 2000);

    // Verify project links exist and have valid hrefs
    const firstLink = await projectsPage.getFirstProjectLink();
    await expect(firstLink).toHaveAttribute("href", /.+/);
  });

  test("featured projects are visible", async ({ projectsPage }) => {
    await projectsPage.goto();

    await projectsPage.verifyFeaturedProjectsVisible();
  });

  test("regular projects are visible", async ({ projectsPage }) => {
    await projectsPage.goto();

    await projectsPage.verifyRegularProjectsVisible();
  });

  test("project links have valid URLs", async ({ projectsPage }) => {
    await projectsPage.goto();

    // Verify CKEditor project link
    await projectsPage.verifyProjectLinkExists(/REST API and CKEditor 5/i);
    
    // Verify Portfolio project link
    await projectsPage.verifyProjectLinkExists(/My website/i);
  });
});
