import { describe, expect, it } from "vitest";
import {
  formatPrice,
  isInStock,
  type Product,
} from "@/domains/catalog/entity/product";

const sampleProduct: Product = {
  id: "1",
  name: "Casque",
  slug: "casque",
  description: "Test",
  price: 99.9,
  currency: "EUR",
  stock: 5,
  sku: "SKU-1",
  category: "Audio",
  brand: "Acme",
  images: { main: "/test.jpg", gallery: [] },
  specs: {},
  similar: [],
};

describe("isInStock", () => {
  it("retourne true si stock > 0", () => {
    expect(isInStock(sampleProduct)).toBe(true);
  });

  it("retourne false si stock = 0", () => {
    expect(isInStock({ ...sampleProduct, stock: 0 })).toBe(false);
  });
});

describe("formatPrice", () => {
  it("formate le prix avec la devise", () => {
    expect(formatPrice(sampleProduct)).toBe("99.90 EUR");
  });
});
