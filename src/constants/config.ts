/**
 * Application configuration constants
 * For sensitive values, use environment variables instead
 */

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "marek.swiechowicz.linkedin@gmail.com";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://marekswiechowicz.pl";

export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/MarekSwiechowicz",
  LINKEDIN: "https://www.linkedin.com/in/marekswiechowicz/",
} as const;

export const FACEBOOK_CONFIG = {
  APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "367844942889515",
  PAGE_ID: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || "508564492876108",
} as const;

