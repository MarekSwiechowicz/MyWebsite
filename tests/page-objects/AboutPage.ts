import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AboutPage extends BasePage {
  async goto() {
    await super.goto("/about");
  }
}
