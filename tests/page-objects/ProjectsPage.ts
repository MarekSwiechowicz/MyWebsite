import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProjectsPage extends BasePage {
  async goto() {
    await super.goto("/projects");
    await this.waitForPageLoad();
  }

  // Project cards
  async getFeaturedProjects() {
    return this.page.locator("section").filter({ 
      has: this.page.getByRole("link", { name: /Visit Project/i })
    });
  }

  async getRegularProjects() {
    return this.page.locator("section").filter({ 
      has: this.page.getByRole("link", { name: /^Visit$/i })
    });
  }

  async getAllProjectCards() {
    return this.page.locator("section").filter({ hasText: /Visit|Visit Project/i });
  }

  async getProjectByTitle(title: string | RegExp) {
    return this.page.locator("section").filter({ hasText: title });
  }

  // Project links
  async getVisitProjectLinks() {
    return this.page.getByRole("link", { name: /Visit Project/i });
  }

  async getVisitLinks() {
    return this.page.getByRole("link", { name: /^Visit$/i });
  }

  async getAllProjectLinks() {
    const visitProjectLinks = await this.getVisitProjectLinks();
    const visitLinks = await this.getVisitLinks();
    const visitProjectCount = await visitProjectLinks.count();
    const visitCount = await visitLinks.count();
    
    if (visitProjectCount > 0) {
      return visitProjectLinks;
    }
    return visitLinks;
  }

  async getFirstProjectLink() {
    const visitProjectLinks = await this.getVisitProjectLinks();
    const visitLinks = await this.getVisitLinks();
    const visitProjectCount = await visitProjectLinks.count();
    
    if (visitProjectCount > 0) {
      return visitProjectLinks.first();
    }
    return visitLinks.first();
  }

  async clickProjectLink(projectTitle: string | RegExp) {
    const projectCard = await this.getProjectByTitle(projectTitle);
    const link = projectCard.getByRole("link", { name: /Visit|Visit Project/i }).first();
    await link.click();
  }

  async getProjectLinkHref(projectTitle: string | RegExp) {
    const projectCard = await this.getProjectByTitle(projectTitle);
    const link = projectCard.getByRole("link", { name: /Visit|Visit Project/i }).first();
    return await link.getAttribute("href");
  }

  // Verify projects
  async verifyFeaturedProjectsVisible() {
    const featuredProjects = await this.getFeaturedProjects();
    const count = await featuredProjects.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyRegularProjectsVisible() {
    const regularProjects = await this.getRegularProjects();
    const count = await regularProjects.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyProjectExists(projectTitle: string | RegExp) {
    const project = await this.getProjectByTitle(projectTitle);
    await expect(project).toBeVisible();
  }

  async verifyProjectLinkExists(projectTitle: string | RegExp) {
    const projectCard = await this.getProjectByTitle(projectTitle);
    const link = projectCard.getByRole("link", { name: /Visit|Visit Project/i }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toMatch(/.+/);
  }

  // Specific project checks
  async verifyCKEditorProjectVisible() {
    await this.verifyProjectExists(/REST API and CKEditor 5/i);
  }

  async verifyPortfolioProjectVisible() {
    await this.verifyProjectExists(/My website/i);
  }

  async verifyTMobileProjectVisible() {
    await this.verifyProjectExists(/T-Mobile Product Purchase/i);
  }

  async verifyTMexpressProjectVisible() {
    await this.verifyProjectExists(/TMexpress/i);
  }
}
