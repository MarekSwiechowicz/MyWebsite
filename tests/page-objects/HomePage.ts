import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  async goto() {
    await super.goto("/");
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
