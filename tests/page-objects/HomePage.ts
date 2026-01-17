import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  async goto() {
    await super.goto("/");
    await this.waitForPageLoad();
  }

  // Navigation
  async clickAbout() {
    await this.clickLinkByText("About");
  }

  async clickProjects() {
    await this.clickLinkByRole(/Projects/i);
  }

  async clickHome() {
    await this.clickLinkByRole(/Home/i);
  }

  // Main content
  async getDescriptionText() {
    return this.page.getByText(/With a background in full-stack development/i);
  }

  async isDescriptionVisible() {
    const description = await this.getDescriptionText();
    return await description.isVisible();
  }

  async getAnimatedTextContainer() {
    return this.page.locator("h1").first();
  }

  async isAnimatedTextVisible() {
    const container = await this.getAnimatedTextContainer();
    return await container.isVisible();
  }

  // Buttons and links
  async getResumeButton() {
    return this.page.getByRole("link", { name: /Resume/i });
  }

  async clickResumeButton() {
    const button = await this.getResumeButton();
    await button.click();
  }

  async getContactLink() {
    return this.page.getByRole("link", { name: /Contact/i });
  }

  async clickContactLink() {
    const link = await this.getContactLink();
    await link.click();
  }

  async verifyContactLinkEmail() {
    const link = await this.getContactLink();
    await expect(link).toHaveAttribute(
      "href",
      /mailto:marek.swiechowicz.linkedin@gmail.com/
    );
  }

  // Social media links
  async getGitHubLink() {
    return this.page.getByLabel("Marek's GitHub");
  }

  async clickGitHub() {
    return this.openExternalLinkByLabel("Marek's GitHub");
  }

  async getLinkedInLink() {
    return this.page.getByLabel("Marek's LinkedIn");
  }

  async clickLinkedIn() {
    return this.openExternalLinkByLabel("Marek's LinkedIn");
  }

  async areSocialLinksVisible() {
    const github = await this.getGitHubLink();
    const linkedin = await this.getLinkedInLink();
    return (
      (await github.isVisible()) && (await linkedin.isVisible())
    );
  }

  // Header/Logo
  async getHeader() {
    return this.page.locator("header");
  }

  async isHeaderVisible() {
    const header = await this.getHeader();
    return await header.isVisible();
  }

  // Verify all main elements
  async verifyAllMainElementsVisible() {
    await expect(await this.getDescriptionText()).toBeVisible();
    await expect(await this.getResumeButton()).toBeVisible();
    await expect(await this.getContactLink()).toBeVisible();
    await expect(await this.getGitHubLink()).toBeVisible();
    await expect(await this.getLinkedInLink()).toBeVisible();
    await expect(await this.getHeader()).toBeVisible();
    await expect(await this.getAnimatedTextContainer()).toBeVisible();
  }
}
