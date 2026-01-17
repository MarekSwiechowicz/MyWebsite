import { test, expect } from "./fixtures/custom-fixtures";
import { waitForAnimations } from "./utils/test-helpers";

test.describe("Navigation", () => {
  test("desktop navigation links are visible", async ({ homePage, page }) => {
    await homePage.goto();

    // Check navigation links (desktop view) using page object
    await expect(page.getByRole("link", { name: /Home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /About/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Projects/i })).toBeVisible();
  });

  test("mobile menu toggle works", async ({ homePage, page }) => {
    // Set mobile viewport using page object method
    await homePage.setViewportSize(375, 667);
    await homePage.goto();

    // Verify mobile menu button is visible
    const menuButton = page.locator("#buttonId");
    await expect(menuButton).toBeVisible();

    // Toggle menu using page object method
    await homePage.toggleMobileMenu();
    
    // Wait for mobile menu to become visible
    const mobileMenu = page.locator("#modalId");
    await expect(mobileMenu).toBeVisible();

    // Close menu
    await homePage.closeMobileMenu();
    await waitForAnimations(page, 300);
  });

  test("navigation links work correctly", async ({ homePage, projectsPage, page }) => {
    await homePage.goto();

    // Test About link using page object
    await homePage.clickAbout();
    await expect(page).toHaveURL("/about");

    // Test Projects link
    await projectsPage.goto();
    await expect(page).toHaveURL("/projects");

    // Test Home link
    await homePage.goto();
    await expect(page).toHaveURL("/");
  });
});
