import fs from "fs";
import path from "path";
import { Product, PortfolioItem } from "./types";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");
const PORTFOLIO_FILE = path.join(process.cwd(), "data", "portfolio.json");

// Ensure directory exists
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Read products
export function getProducts(): Product[] {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading products:", err);
    return [];
  }
}

// Write products
export function saveProducts(products: Product[]): boolean {
  try {
    ensureDirectoryExistence(PRODUCTS_FILE);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing products:", err);
    return false;
  }
}

// Add a single product
export function addProduct(product: Omit<Product, "id">): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
}

// Update a product
export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

// Delete a product
export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  return saveProducts(filtered);
}

// Read portfolio items
export function getPortfolioItems(): PortfolioItem[] {
  try {
    if (!fs.existsSync(PORTFOLIO_FILE)) {
      return [];
    }
    const data = fs.readFileSync(PORTFOLIO_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading portfolio:", err);
    return [];
  }
}

// Write portfolio items
export function savePortfolioItems(items: PortfolioItem[]): boolean {
  try {
    ensureDirectoryExistence(PORTFOLIO_FILE);
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(items, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing portfolio:", err);
    return false;
  }
}

// Add portfolio item
export function addPortfolioItem(item: Omit<PortfolioItem, "id" | "no">): PortfolioItem {
  const items = getPortfolioItems();
  const nextNo = (items.length + 1).toString().padStart(2, "0");
  const newItem: PortfolioItem = {
    ...item,
    id: `port-${Date.now().toString(36)}`,
    no: nextNo,
  };
  items.push(newItem);
  savePortfolioItems(items);
  return newItem;
}

