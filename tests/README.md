# Test Framework Documentation

This directory contains the end-to-end test suite for the portfolio website using Playwright.

## Structure

```
tests/
├── fixtures/           # Custom Playwright fixtures
│   └── custom-fixtures.ts
├── page-objects/       # Page Object Model classes
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── AboutPage.ts
│   └── ProjectsPage.ts
├── utils/              # Test utilities and helpers
│   └── test-helpers.ts
├── homepageNavigation.spec.ts
└── ui.spec.ts
```

## Page Object Model

The test framework uses the Page Object Model (POM) pattern to encapsulate page interactions and make tests more maintainable.

### BasePage

The base class that all page objects extend. Provides common functionality:

- Navigation methods (`goto`, `clickLinkByText`, `clickLinkByRole`)
- Language switching (`changeLanguage`)
- Viewport management (`setViewportSize`)
- Mobile menu interactions (`toggleMobileMenu`, `isMobileMenuOpen`)
- Utility methods (`waitForPageLoad`, `scrollToBottom`, `scrollToTop`)

### HomePage

Methods for interacting with the homepage:

- `goto()` - Navigate to homepage
- `clickAbout()`, `clickProjects()`, `clickHome()` - Navigation
- `clickResumeButton()`, `clickContactLink()` - Main actions
- `clickGitHub()`, `clickLinkedIn()` - Social links
- `verifyAllMainElementsVisible()` - Verify all homepage elements
- `getDescriptionText()`, `isDescriptionVisible()` - Content checks

### AboutPage

Methods for the About page:

- `goto()` - Navigate to about page
- `verifyAllSectionsPresent()` - Verify all sections
- `getBiographyHeading()`, `isBiographyVisible()` - Biography section
- `getProfileImage()`, `isProfileImageVisible()` - Profile image
- `getProjectsCompletedSection()`, `getYearsOfExperienceSection()` - Animated numbers
- `scrollToSkills()`, `scrollToExperience()`, `scrollToEducation()` - Section navigation
- `isSkillsSectionVisible()`, `isExperienceSectionVisible()`, `isEducationSectionVisible()` - Section visibility

### ProjectsPage

Methods for the Projects page:

- `goto()` - Navigate to projects page
- `getFeaturedProjects()`, `getRegularProjects()` - Get project cards
- `getProjectByTitle(title)` - Find specific project
- `clickProjectLink(title)` - Click project link
- `verifyProjectExists(title)`, `verifyProjectLinkExists(title)` - Verification methods
- `verifyCKEditorProjectVisible()`, `verifyPortfolioProjectVisible()` - Specific project checks

## Test Utilities

The `test-helpers.ts` file provides reusable utility functions:

- `waitForAnimations(page, timeout)` - Wait for animations to complete
- `waitForPageReady(page)` - Wait for page to be fully loaded
- `scrollToElementAndWait(page, selector, timeout)` - Scroll and wait for element
- `elementExists(page, selector)` - Check if element exists without throwing
- `getTextContentSafe(page, selector)` - Safely get text content
- `waitForUrl(page, urlPattern, timeout)` - Wait for URL to match pattern
- `takeScreenshot(page, name, fullPage)` - Take screenshot with timestamp
- `isCI()` - Check if running in CI environment
- `retryWithBackoff(fn, maxRetries, initialDelay)` - Retry with exponential backoff
- `waitForText(page, selector, expectedText, timeout)` - Wait for element text
- `isInViewport(page, selector)` - Check if element is in viewport

## Custom Fixtures

Custom fixtures are available in `fixtures/custom-fixtures.ts`:

```typescript
import { test, expect } from "./fixtures/custom-fixtures";

test("example using fixtures", async ({ homePage, aboutPage, projectsPage }) => {
  await homePage.goto();
  await homePage.verifyAllMainElementsVisible();
  
  await aboutPage.goto();
  await aboutPage.verifyAllSectionsPresent();
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Run specific test file
npx playwright test tests/homepageNavigation.spec.ts

# Run tests with specific project
npx playwright test --project=chromium

# Run smoke tests only
npx playwright test --grep @smoke
```

## Test Organization

### Smoke Tests

Tests marked with `@smoke` are critical path tests that run against production:

- Homepage title verification
- Basic navigation

### UI Tests

Comprehensive UI tests covering:

- Homepage UI elements
- About page sections
- Projects page display
- Navigation functionality
- Language switching
- Footer elements
- Responsive design

## Best Practices

1. **Use Page Objects**: Always use page object methods instead of direct page interactions
2. **Wait for Load**: Use `waitForPageLoad()` after navigation
3. **Use Helpers**: Leverage utility functions for common operations
4. **Verify Elements**: Use page object verification methods when available
5. **Handle Animations**: Use `waitForAnimations()` when needed
6. **Mobile Testing**: Use `setViewportSize()` for responsive tests

## CI/CD Integration

Tests run automatically on:
- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch
- Scheduled daily (prod smoke tests at 03:00 UTC)

## Configuration

Test configuration is in `playwright.config.ts`:

- **Test Directory**: `./tests`
- **Timeout**: 30 seconds
- **Retries**: 2 (except prod-smoke)
- **Browsers**: chromium, firefox, webkit
- **Base URL**: `http://localhost:3000` (or production for smoke tests)
