import { test, expect } from "./fixtures/custom-fixtures";

test.describe("Footer", () => {
  test("footer displays all elements", async ({ homePage, page }) => {
    await homePage.goto();

    // Scroll to footer using page object method
    await homePage.scrollToBottom();

    // Check footer content
    await expect(page.getByText(/All Rights Reserved/i)).toBeVisible();
    await expect(page.getByText(/Build With/i)).toBeVisible();
    await expect(page.getByText(/Say Hello/i)).toBeVisible();
  });

  test("footer email link works", async ({ homePage, page }) => {
    await homePage.goto();

    // Scroll to footer using page object method
    await homePage.scrollToBottom();

    const sayHelloLink = page.getByRole("link", { name: /Say Hello/i });
    await expect(sayHelloLink).toHaveAttribute(
      "href",
      /mailto:marek.swiechowicz.linkedin@gmail.com/
    );
  });
});
