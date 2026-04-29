import { test, expect } from "@playwright/test";

test("home page lists all posts", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Ryan's Blog/);

  const posts = [
    "A JavaScript-free Responsive Navigation Menu with Tailwind CSS",
    "A Light/Dark Theme Switcher for Static Sites with Tailwind CSS",
    "Building a Static Site with Jekyll and Tailwind CSS",
    "Building a Static Site with Jekyll and Tailwind CSS v4",
    "Changelog Generation with GitHub Actions",
    "Deploy Jekyll to GitHub Pages with Tailwind CSS",
    "Ruby Code Coverage for Backward Compatibility",
    "Multiple Test Runners for Ruby Code Coverage with CodeCov",
  ];

  for (const title of posts) {
    await expect(page.getByText(title, { exact: false }).first()).toBeVisible();
  }
});
