import { test, expect } from "./fixtures/custom-fixtures";
import { waitForAnimations } from "./utils/test-helpers";

test.describe("About Page", () => {
  test("displays all about page sections", async ({ aboutPage }) => {
    await aboutPage.goto();

    // Verify all sections using page object method
    await aboutPage.verifyAllSectionsPresent();
  });

  test("animated numbers are displayed", async ({ aboutPage, page }) => {
    await aboutPage.goto();

    // Wait for animations to potentially complete
    await waitForAnimations(page, 1000);

    // Verify animated numbers are visible using page object methods
    await expect(await aboutPage.getProjectsCompletedSection()).toBeVisible();
    await expect(await aboutPage.getYearsOfExperienceSection()).toBeVisible();
  });

  test("Skills section is accessible", async ({ aboutPage }) => {
    await aboutPage.goto();

    await aboutPage.scrollToSkills();
    await expect(await aboutPage.isSkillsSectionVisible()).toBeTruthy();
  });

  test("Experience section is accessible", async ({ aboutPage }) => {
    await aboutPage.goto();

    await aboutPage.scrollToExperience();
    await expect(await aboutPage.isExperienceSectionVisible()).toBeTruthy();
  });

  test("Education section is accessible", async ({ aboutPage }) => {
    await aboutPage.goto();

    await aboutPage.scrollToEducation();
    await expect(await aboutPage.isEducationSectionVisible()).toBeTruthy();
  });
});
