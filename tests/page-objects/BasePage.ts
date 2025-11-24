import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoPath(path: string) {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async clickLinkByText(text: string) {
    await this.page.getByText(text).click();
  }

  async openExternalLinkByLabel(label: string) {
    const popup = this.page.waitForEvent("popup");
    await this.page.getByLabel(label).click();
    return popup;
  }

  async clickFirstButton() {
    await this.page.getByRole("button").first().click();
  }

  // Quick fix to avoid strict mode violation in CI:
  async changeLanguage(language: "PL" | "EN") {
    await this.page.getByRole("button", { name: language }).first().click();

    // Recommended long-term alternative (after adding data-testid to the app):
  }
}
