import { Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async clickLinkByText(text: string) {
    await this.page.getByText(text).click();
  }

  async clickLinkByRole(name: string | RegExp) {
    await this.page.getByRole("link", { name }).click();
  }

  async openExternalLinkByLabel(label: string) {
    const popup = this.page.waitForEvent("popup");
    await this.page.getByLabel(label).click();
    return popup;
  }

  async clickFirstButton() {
    await this.page.getByRole("button").first().click();
  }

  async changeLanguage(language: "PL" | "EN") {
    await this.page.getByRole("button", { name: language }).first().click();
    await this.page.waitForLoadState("networkidle");
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async isElementVisible(selector: string) {
    return await this.page.locator(selector).isVisible();
  }

  async getTextContent(selector: string) {
    return await this.page.locator(selector).textContent();
  }

  async clickNavigationLink(linkName: string | RegExp) {
    await this.page.getByRole("link", { name: linkName }).click();
  }

  async toggleMobileMenu() {
    const menuButton = this.page.locator("#buttonId");
    await menuButton.click();
  }

  async isMobileMenuOpen() {
    const mobileMenu = this.page.locator("#modalId");
    return await mobileMenu.isVisible();
  }

  async closeMobileMenu() {
    if (await this.isMobileMenuOpen()) {
      await this.toggleMobileMenu();
    }
  }
}
