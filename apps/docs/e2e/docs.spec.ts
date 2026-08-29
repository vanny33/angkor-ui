import { test, expect } from "@playwright/test";

test.describe("Angkor UI Docs Site E2E", () => {
  test("should redirect from root / to /km and load homepage in Khmer", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/km$/);
    
    // Check main title
    const title = page.locator("h1");
    await expect(title).toContainText("Angkor UI");

    // Check features
    await expect(page.locator("text=ស្ថាបត្យកម្មចម្លងកូដផ្ទាល់ខ្លួន")).toBeVisible();
  });

  test("should allow switching language to English and load correct tagline", async ({ page }) => {
    await page.goto("/km");
    
    // Click language switcher to English
    const langBtn = page.getByRole("button", { name: "English" });
    await expect(langBtn).toBeVisible();
    await langBtn.click();
    
    await expect(page).toHaveURL(/\/en$/);
    
    // Check English tagline
    await expect(page.locator("text=Beautiful, accessible, animated components for Khmer")).toBeVisible();
  });

  test("should navigate to documentation pages and display components list", async ({ page }) => {
    await page.goto("/en/docs");
    
    // Sidebar should be visible
    const aside = page.locator("aside");
    await expect(aside).toBeVisible();
    await expect(aside.getByText("Introduction")).toBeVisible();
    await expect(aside.getByText("Button")).toBeVisible();

    // Navigate to Button component page
    await aside.getByText("Button").click();
    await expect(page).toHaveURL(/\/en\/docs\/components\/button$/);

    // Component preview should render
    await expect(page.locator("h1")).toContainText("Button");
    await expect(page.locator("text=Live Preview")).toBeVisible();
    await expect(page.locator("text=Props Reference")).toBeVisible();
  });
});
