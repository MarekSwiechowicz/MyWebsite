import { test, expect } from "./fixtures/custom-fixtures";

test.describe("Responsive Design", () => {
  test("homepage is responsive on mobile", async ({ homePage, page }) => {
    // Set mobile viewport using page object method
    await homePage.setViewportSize(375, 667);
    await homePage.goto();

    // Main content should still be visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.locator("#buttonId")).toBeVisible();
  });

  test("homepage is responsive on tablet", async ({ homePage }) => {
    // Set tablet viewport using page object method
    await homePage.setViewportSize(768, 1024);
    await homePage.goto();

    // Content should be visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();
  });

  test("homepage is responsive on desktop", async ({ homePage }) => {
    // Set desktop viewport using page object method
    await homePage.setViewportSize(1920, 1080);
    await homePage.goto();

    // All elements should be visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();
    await expect(await homePage.getResumeButton()).toBeVisible();
  });
});
