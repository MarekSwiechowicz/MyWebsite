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
    await this.page.click(`text=${text}`);
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
    await this.page.getByRole("button", { name: language }).click();
  }
}
