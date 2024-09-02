import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Marek Święchowicz");
});

test("can navigate to about page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=About");
  await expect(page).toHaveURL("/about");
});

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByLabel("Marek's GitHub").click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent("popup");
  await page.getByLabel("Marek's LinkedIn").click();
  const page2 = await page2Promise;
  await page.getByRole("button").first().click();
  await page.getByRole("button").first().click();
  await page.getByRole("button", { name: "PL" }).click();
  await page.getByRole("button", { name: "EN" }).click();
  await page.getByRole("link", { name: "About" }).click();
});
