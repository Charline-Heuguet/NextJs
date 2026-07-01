import { expect, test } from "@playwright/test";

test("affiche la liste des produits", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("heading", { name: /produits|products/i })).toBeVisible();
  await expect(page.locator("article").first()).toBeVisible();
});

test("navigue vers une fiche produit", async ({ page }) => {
  await page.goto("/products");
  await page.locator("article a").first().click();
  await expect(page).toHaveURL(/\/products\/.+/);
  await expect(page.locator("h1").first()).toBeVisible();
});

test("change la langue via le switcher", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("locale-en").click();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await page.getByTestId("locale-fr").click();
  await expect(page.getByRole("link", { name: "Accueil" })).toBeVisible();
});
