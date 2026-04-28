import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/posts/collapsible-navigation-menu-without-js");
});

test("page renders all four demo navbars", async ({ page }) => {
  const demos = page.locator(".not-prose nav");
  await expect(demos).toHaveCount(4);
});

test.describe("hamburger menu demo", () => {
  // Demo 4: input#navbar-trigger with peer/hamburger — menu starts visible (checked)
  test("menu is visible on load", async ({ page }) => {
    const menu = page.locator("input#navbar-trigger ~ ul");
    await expect(menu).toBeVisible();
  });

  test("clicking hamburger hides the menu", async ({ page }) => {
    const label = page.locator('label[for="navbar-trigger"]');
    const menu = page.locator("input#navbar-trigger ~ ul");

    await label.click();
    await expect(menu).toBeHidden();
  });

  test("clicking hamburger twice restores the menu", async ({ page }) => {
    const label = page.locator('label[for="navbar-trigger"]');
    const menu = page.locator("input#navbar-trigger ~ ul");

    await label.click();
    await label.click();
    await expect(menu).toBeVisible();
  });
});
