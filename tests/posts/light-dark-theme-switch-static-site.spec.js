import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/posts/light-dark-theme-switch-static-site");
});

test.describe("theme switcher demo", () => {
  test("starts in light mode — moon icon visible, sun icon hidden", async ({
    page,
  }) => {
    const demo = page.locator(".not-prose").first();
    // Moon and sun SVGs are the two icons inside the toggle label
    const moonIcon = demo.locator('label[for="theme-trigger"] svg').first();
    const sunIcon = demo.locator('label[for="theme-trigger"] svg').last();

    await expect(demo).not.toHaveClass(/\bdark\b/);
    await expect(moonIcon).toBeVisible();
    await expect(sunIcon).toBeHidden();
  });

  test("clicking the toggle switches to dark mode", async ({ page }) => {
    const demo = page.locator(".not-prose").first();
    const label = demo.locator('label[for="theme-trigger"]');

    await label.click();

    await expect(demo).toHaveClass(/\bdark\b/);
  });

  test("clicking the toggle twice returns to light mode", async ({ page }) => {
    const demo = page.locator(".not-prose").first();
    const label = demo.locator('label[for="theme-trigger"]');

    await label.click();
    await label.click();

    await expect(demo).not.toHaveClass(/\bdark\b/);
  });

  test("dark mode shows sun icon, hides moon icon", async ({ page }) => {
    const demo = page.locator(".not-prose").first();
    const label = demo.locator('label[for="theme-trigger"]');
    const moonIcon = demo.locator('label[for="theme-trigger"] svg').first();
    const sunIcon = demo.locator('label[for="theme-trigger"] svg').last();

    await label.click();

    await expect(moonIcon).toBeHidden();
    await expect(sunIcon).toBeVisible();
  });
});
