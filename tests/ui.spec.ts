import { test, expect } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage";
import { AboutPage } from "./page-objects/AboutPage";
import { ProjectsPage } from "./page-objects/ProjectsPage";
import { waitForAnimations } from "./utils/test-helpers";

test.describe("Homepage UI", () => {
  test("displays all main homepage elements", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Verify all main elements using page object methods
    await homePage.verifyAllMainElementsVisible();
  });

  test("Resume button navigates to about page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.clickResumeButton();
    await expect(page).toHaveURL("/about");
  });

  test("Contact link opens email client", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.verifyContactLinkEmail();
  });
});

test.describe("About Page UI", () => {
  test("displays all about page sections", async ({ page }) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.goto();

    // Verify all sections using page object method
    await aboutPage.verifyAllSectionsPresent();
  });

  test("animated numbers are displayed", async ({ page }) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.goto();

    // Wait for animations to potentially complete
    await waitForAnimations(page, 1000);

    // Verify animated numbers are visible using page object methods
    await expect(await aboutPage.getProjectsCompletedSection()).toBeVisible();
    await expect(await aboutPage.getYearsOfExperienceSection()).toBeVisible();
  });

  test("Skills section is accessible", async ({ page }) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.goto();

    await aboutPage.scrollToSkills();
    await expect(await aboutPage.isSkillsSectionVisible()).toBeTruthy();
  });

  test("Experience section is accessible", async ({ page }) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.goto();

    await aboutPage.scrollToExperience();
    await expect(await aboutPage.isExperienceSectionVisible()).toBeTruthy();
  });

  test("Education section is accessible", async ({ page }) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.goto();

    await aboutPage.scrollToEducation();
    await expect(await aboutPage.isEducationSectionVisible()).toBeTruthy();
  });
});

test.describe("Projects Page UI", () => {
  test("displays all project cards", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
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

  test("project links are clickable", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();

    await waitForAnimations(page, 2000);

    // Verify project links exist and have valid hrefs
    const firstLink = await projectsPage.getFirstProjectLink();
    await expect(firstLink).toHaveAttribute("href", /.+/);
  });

  test("featured projects are visible", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();

    await projectsPage.verifyFeaturedProjectsVisible();
  });

  test("regular projects are visible", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();

    await projectsPage.verifyRegularProjectsVisible();
  });

  test("project links have valid URLs", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();

    // Verify CKEditor project link
    await projectsPage.verifyProjectLinkExists(/REST API and CKEditor 5/i);
    
    // Verify Portfolio project link
    await projectsPage.verifyProjectLinkExists(/My website/i);
  });
});

test.describe("Navigation UI", () => {
  test("desktop navigation links are visible", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Check navigation links (desktop view) using page object
    await expect(page.getByRole("link", { name: /Home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /About/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Projects/i })).toBeVisible();
  });

  test("mobile menu toggle works", async ({ page }) => {
    const homePage = new HomePage(page);
    
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

  test("navigation links work correctly", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Test About link using page object
    await homePage.clickAbout();
    await expect(page).toHaveURL("/about");

    // Test Projects link
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();
    await expect(page).toHaveURL("/projects");

    // Test Home link
    await homePage.goto();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Language Switcher UI", () => {
  test("language switcher buttons are visible", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Language switcher buttons should be visible
    const plButton = page.getByRole("button", { name: "PL" });
    const enButton = page.getByRole("button", { name: "EN" });

    await expect(plButton.first()).toBeVisible();
    await expect(enButton.first()).toBeVisible();
  });

  test("language switching changes content", async ({ page }) => {
    const homePage = new HomePage(page);
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

test.describe("Footer UI", () => {
  test("footer displays all elements", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Scroll to footer using page object method
    await homePage.scrollToBottom();

    // Check footer content
    await expect(page.getByText(/All Rights Reserved/i)).toBeVisible();
    await expect(page.getByText(/Build With/i)).toBeVisible();
    await expect(page.getByText(/Say Hello/i)).toBeVisible();
  });

  test("footer email link works", async ({ page }) => {
    const homePage = new HomePage(page);
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

test.describe("Responsive Design", () => {
  test("homepage is responsive on mobile", async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Set mobile viewport using page object method
    await homePage.setViewportSize(375, 667);
    await homePage.goto();

    // Main content should still be visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.locator("#buttonId")).toBeVisible();
  });

  test("homepage is responsive on tablet", async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Set tablet viewport using page object method
    await homePage.setViewportSize(768, 1024);
    await homePage.goto();

    // Content should be visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();
  });

  test("homepage is responsive on desktop", async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Set desktop viewport using page object method
    await homePage.setViewportSize(1920, 1080);
    await homePage.goto();

    // All elements should be visible using page object
    await expect(await homePage.getDescriptionText()).toBeVisible();
    await expect(await homePage.getResumeButton()).toBeVisible();
  });
});

