import { expect, test } from "@playwright/test";

test("loads home page and shows boilerplate HUD", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Webdev The Game");
  await expect(page.getByRole("heading", { name: "Webdev The Game" })).toBeVisible();
  await expect(page.getByText("Boilerplate Vue + PixiJS")).toBeVisible();
});
