import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.gotoPath("/");
  }

  async clickAbout() {
    await this.clickLinkByText("About");
  }

  async clickGitHub() {
    return this.openExternalLinkByLabel("Marek's GitHub");
  }

  async clickLinkedIn() {
    return this.openExternalLinkByLabel("Marek's LinkedIn");
  }
}
