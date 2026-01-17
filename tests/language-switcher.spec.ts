import { test, expect } from "./fixtures/custom-fixtures";

test.describe("Language Switcher", () => {
  test("language switcher buttons are visible", async ({ homePage, page }) => {
    await homePage.goto();

    // Language switcher buttons should be visible
    const plButton = page.getByRole("button", { name: "PL" });
    const enButton = page.getByRole("button", { name: "EN" });

    await expect(plButton.first()).toBeVisible();
    await expect(enButton.first()).toBeVisible();
  });

  test("language switching changes content", async ({ homePage, page }) => {
    await homePage.goto();

    // Verify initial English content is visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();

    // Switch to Polish using page object method
    await homePage.changeLanguage("PL");
    await expect(page).toHaveURL(/\/$/);

    // Switch back to English
    await homePage.changeLanguage("EN");
    await expect(page).toHaveURL(/\/$/);

    // Verify we're back to English
    await expect(await homePage.getDescriptionText()).toBeVisible();
  });
});
