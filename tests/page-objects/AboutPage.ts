import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AboutPage extends BasePage {
  async goto() {
    await super.goto("/about");
    await this.waitForPageLoad();
  }

  // Biography section
  async getBiographyHeading() {
    return this.page.getByText(/Biography/i);
  }

  async getBiographyText() {
    return this.page.getByText(/I began my tech journey at Geeknauts/i);
  }

  async isBiographyVisible() {
    const heading = await this.getBiographyHeading();
    return await heading.isVisible();
  }

  // Profile image
  async getProfileImage() {
    return this.page.getByAltText(/Marek's Profile Picture/i);
  }

  async isProfileImageVisible() {
    const image = await this.getProfileImage();
    return await image.isVisible();
  }

  // Animated numbers
  async getProjectsCompletedSection() {
    return this.page.getByText(/Projects Completed/i);
  }

  async getYearsOfExperienceSection() {
    return this.page.getByText(/Years of Experience/i);
  }

  async getProjectsNumber() {
    return this.page.locator("text=/10\\+/");
  }

  async getExperienceNumber() {
    return this.page.locator("text=/5\\+/");
  }

  async areAnimatedNumbersVisible() {
    const projects = await this.getProjectsCompletedSection();
    const experience = await this.getYearsOfExperienceSection();
    return (
      (await projects.isVisible()) && (await experience.isVisible())
    );
  }

  // Skills section
  async getSkillsHeading() {
    return this.page.getByText(/^Skills$/i);
  }

  async getSkillsSection() {
    return this.page.locator("text=/Testing/i");
  }

  async isSkillsSectionVisible() {
    const heading = await this.getSkillsHeading();
    return await heading.isVisible();
  }

  async scrollToSkills() {
    const heading = await this.getSkillsHeading();
    await heading.scrollIntoViewIfNeeded();
  }

  // Experience section
  async getExperienceHeading() {
    return this.page.getByRole("heading", { name: "Experience", exact: true });
  }

  async getExperienceItems() {
    return this.page.locator("li").filter({ hasText: /Software Engineer|Quality Assurance|Test Engineer/i });
  }

  async isExperienceSectionVisible() {
    const heading = await this.getExperienceHeading();
    return await heading.isVisible();
  }

  async scrollToExperience() {
    const heading = await this.getExperienceHeading();
    await heading.scrollIntoViewIfNeeded();
  }

  // Education section
  async getEducationHeading() {
    return this.page.getByText(/Education/i);
  }

  async getEducationItems() {
    return this.page.locator("li").filter({ hasText: /Master|Bachelor/i });
  }

  async isEducationSectionVisible() {
    const heading = await this.getEducationHeading();
    return await heading.isVisible();
  }

  async scrollToEducation() {
    const heading = await this.getEducationHeading();
    await heading.scrollIntoViewIfNeeded();
  }

  // Verify all main sections are present
  async verifyAllSectionsPresent() {
    await expect(await this.getBiographyHeading()).toBeVisible();
    await expect(await this.getProfileImage()).toBeVisible();
    await expect(await this.getProjectsCompletedSection()).toBeVisible();
    await expect(await this.getYearsOfExperienceSection()).toBeVisible();
    await expect(await this.getSkillsHeading()).toBeVisible();
    await expect(await this.getExperienceHeading()).toBeVisible();
    await expect(await this.getEducationHeading()).toBeVisible();
  }
}
