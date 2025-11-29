import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProjectsPage extends BasePage {
  async goto() {
    await super.goto("/projects");
  }
}
