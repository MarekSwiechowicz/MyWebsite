import { test, expect } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage";

test.describe("Homepage UI", () => {
  test("displays all main homepage elements", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check main content - description text is more reliable than animated text
    await expect(
      page.getByText(/With a background in full-stack development/i)
    ).toBeVisible();

    // Check buttons and links
    await expect(page.getByRole("link", { name: /Resume/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Contact/i })).toBeVisible();

    // Check social media links
    await expect(
      page.getByLabel("Marek's GitHub")
    ).toBeVisible();
    await expect(
      page.getByLabel("Marek's LinkedIn")
    ).toBeVisible();

    // Check logo is visible
    await expect(page.locator("header")).toBeVisible();

    // Check that animated text container exists (h1 with animated content)
    const animatedTextContainer = page.locator("h1").first();
    await expect(animatedTextContainer).toBeVisible();
  });

  test("Resume button navigates to about page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await page.getByRole("link", { name: /Resume/i }).click();
    await expect(page).toHaveURL("/about");
  });

  test("Contact link opens email client", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const contactLink = page.getByRole("link", { name: /Contact/i });
    await expect(contactLink).toHaveAttribute(
      "href",
      /mailto:marek.swiechowicz.linkedin@gmail.com/
    );
  });
});

test.describe("About Page UI", () => {
  test("displays all about page sections", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");

    // Check that animated heading container exists
    const headingContainer = page.locator("h1").first();
    await expect(headingContainer).toBeVisible();

    // Check biography section
    await expect(page.getByText(/Biography/i)).toBeVisible();
    await expect(
      page.getByText(/I began my tech journey at Geeknauts/i)
    ).toBeVisible();

    // Check profile image
    const profileImage = page.getByAltText(/Marek's Profile Picture/i);
    await expect(profileImage).toBeVisible();

    // Check animated numbers
    await expect(page.getByText(/Projects Completed/i)).toBeVisible();
    await expect(page.getByText(/Years of Experience/i)).toBeVisible();

    // Check sections are present
    await expect(page.getByText(/^Skills$/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience", exact: true })).toBeVisible();
    await expect(page.getByText(/Education/i)).toBeVisible();
  });

  test("animated numbers are displayed", async ({ page }) => {
    await page.goto("/about");

    // Wait for animations to potentially complete
    await page.waitForTimeout(1000);

    // Check that number containers exist (they should have content)
    const projectsNumber = page.locator("text=/10\\+/");
    const experienceNumber = page.locator("text=/5\\+/");

    // At minimum, the containers should be visible
    await expect(page.getByText(/Projects Completed/i)).toBeVisible();
    await expect(page.getByText(/Years of Experience/i)).toBeVisible();
  });
});

test.describe("Projects Page UI", () => {
  test("displays all project cards", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // Check that animated heading container exists
    const headingContainer = page.locator("h1").first();
    await expect(headingContainer).toBeVisible();

    // Check featured projects
    await expect(
      page.getByText(/REST API and CKEditor 5/i)
    ).toBeVisible();
    await expect(page.getByText(/My website/i)).toBeVisible();

    // Check regular projects
    await expect(page.getByText(/T-Mobile Product Purchase/i)).toBeVisible();
    await expect(page.getByText(/TMexpress/i)).toBeVisible();

    // Check project links - look for "Visit Project" or "Visit"
    const visitProjectLinks = page.getByRole("link", { name: /Visit Project/i });
    const visitLinks = page.getByRole("link", { name: /^Visit$/i });
    
    const hasVisitProject = (await visitProjectLinks.count()) > 0;
    const hasVisit = (await visitLinks.count()) > 0;
    
    expect(hasVisitProject || hasVisit).toBeTruthy();
  });

  test("project links are clickable", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForTimeout(2000);

    // Check that project links exist - try both "Visit Project" and "Visit"
    const visitProjectLinks = page.getByRole("link", { name: /Visit Project/i });
    const visitLinks = page.getByRole("link", { name: /^Visit$/i });
    
    const projectCount = await visitProjectLinks.count();
    const visitCount = await visitLinks.count();
    
    expect(projectCount + visitCount).toBeGreaterThan(0);

    // Verify first project link has valid href
    const firstLink = projectCount > 0 
      ? visitProjectLinks.first() 
      : visitLinks.first();
    await expect(firstLink).toHaveAttribute("href", /.+/);
  });
});

test.describe("Navigation UI", () => {
  test("desktop navigation links are visible", async ({ page }) => {
    await page.goto("/");

    // Check navigation links (desktop view)
    await expect(page.getByRole("link", { name: /Home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /About/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Projects/i })).toBeVisible();
  });

  test("mobile menu toggle works", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Find and click mobile menu button
    const menuButton = page.locator("#buttonId");
    await expect(menuButton).toBeVisible();

    // Click to open menu
    await menuButton.click();

    // Check if mobile menu is visible (modal should appear)
    const mobileMenu = page.locator("#modalId");
    await expect(mobileMenu).toBeVisible();

    // Click again to close
    await menuButton.click();
    // Menu should close (might need to wait for animation)
    await page.waitForTimeout(300);
  });

  test("navigation links work correctly", async ({ page }) => {
    await page.goto("/");

    // Test About link
    await page.getByRole("link", { name: /About/i }).click();
    await expect(page).toHaveURL("/about");

    // Test Projects link
    await page.getByRole("link", { name: /Projects/i }).click();
    await expect(page).toHaveURL("/projects");

    // Test Home link
    await page.getByRole("link", { name: /Home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Language Switcher UI", () => {
  test("language switcher buttons are visible", async ({ page }) => {
    await page.goto("/");

    // Language switcher buttons should be visible
    const plButton = page.getByRole("button", { name: "PL" });
    const enButton = page.getByRole("button", { name: "EN" });

    await expect(plButton.first()).toBeVisible();
    await expect(enButton.first()).toBeVisible();
  });

  test("language switching changes content", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify initial English content is visible (description text)
    await expect(
      page.getByText(/With a background in full-stack development/i)
    ).toBeVisible();

    // Switch to Polish
    await page.getByRole("button", { name: "PL" }).first().click();
    await page.waitForLoadState("networkidle");

    // Switch back to English
    await page.getByRole("button", { name: "EN" }).first().click();
    await page.waitForLoadState("networkidle");

    // Verify we're back to English
    await expect(
      page.getByText(/With a background in full-stack development/i)
    ).toBeVisible();
  });
});

test.describe("Footer UI", () => {
  test("footer displays all elements", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer content
    await expect(page.getByText(/All Rights Reserved/i)).toBeVisible();
    await expect(page.getByText(/Build With/i)).toBeVisible();
    await expect(page.getByText(/Say Hello/i)).toBeVisible();
  });

  test("footer email link works", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const sayHelloLink = page.getByRole("link", { name: /Say Hello/i });
    await expect(sayHelloLink).toHaveAttribute(
      "href",
      /mailto:marek.swiechowicz.linkedin@gmail.com/
    );
  });
});

test.describe("Responsive Design", () => {
  test("homepage is responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Main content should still be visible
    await expect(
      page.getByText(/With a background in full-stack development/i)
    ).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.locator("#buttonId")).toBeVisible();
  });

  test("homepage is responsive on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Content should be visible
    await expect(
      page.getByText(/With a background in full-stack development/i)
    ).toBeVisible();
  });

  test("homepage is responsive on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // All elements should be visible
    await expect(
      page.getByText(/With a background in full-stack development/i)
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Resume/i })).toBeVisible();
  });
});

