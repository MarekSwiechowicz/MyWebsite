import { Page, expect } from "@playwright/test";

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page, timeout = 1000) {
  await page.waitForTimeout(timeout);
}

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

/**
 * Scroll element into view and wait for it to be visible
 */
export async function scrollToElementAndWait(
  page: Page,
  selector: string,
  timeout = 5000
) {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await expect(element).toBeVisible({ timeout });
}

/**
 * Check if element exists without throwing
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    const element = page.locator(selector);
    await element.waitFor({ state: "attached", timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get text content safely
 */
export async function getTextContentSafe(
  page: Page,
  selector: string
): Promise<string | null> {
  try {
    const element = page.locator(selector);
    if (await element.isVisible({ timeout: 2000 })) {
      return await element.textContent();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Wait for URL to match pattern
 */
export async function waitForUrl(
  page: Page,
  urlPattern: string | RegExp,
  timeout = 5000
) {
  await expect(page).toHaveURL(urlPattern, { timeout });
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshot(
  page: Page,
  name: string,
  fullPage = false
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage,
  });
}

/**
 * Check if running in CI environment
 */
export function isCI(): boolean {
  return !!(
    process.env.CI ||
    process.env.GITHUB_ACTIONS ||
    process.env.CIRCLECI ||
    process.env.JENKINS
  );
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error("Retry failed");
}

/**
 * Wait for element to have specific text
 */
export async function waitForText(
  page: Page,
  selector: string,
  expectedText: string | RegExp,
  timeout = 5000
) {
  const element = page.locator(selector);
  await expect(element).toHaveText(expectedText, { timeout });
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector);
  const boundingBox = await element.boundingBox();
  if (!boundingBox) return false;
  
  const viewport = page.viewportSize();
  if (!viewport) return false;
  
  return (
    boundingBox.x >= 0 &&
    boundingBox.y >= 0 &&
    boundingBox.x + boundingBox.width <= viewport.width &&
    boundingBox.y + boundingBox.height <= viewport.height
  );
}
