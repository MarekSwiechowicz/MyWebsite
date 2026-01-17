import { test as base, expect } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { AboutPage } from "../page-objects/AboutPage";
import { ProjectsPage } from "../page-objects/ProjectsPage";

// Extend the base test with custom fixtures
type CustomFixtures = {
  homePage: HomePage;
  aboutPage: AboutPage;
  projectsPage: ProjectsPage;
};

export const test = base.extend<CustomFixtures>({
  // HomePage fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // AboutPage fixture
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page);
    await use(aboutPage);
  },

  // ProjectsPage fixture
  projectsPage: async ({ page }, use) => {
    const projectsPage = new ProjectsPage(page);
    await use(projectsPage);
  },
});

export { expect };
