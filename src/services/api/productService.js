import productsData from "@/services/mockData/products.json";

const STORAGE_KEY = "stylehub_products";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with mock data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
  }
};

const getData = () => {
  initializeData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const productService = {
  async getAll() {
    await delay(300);
    return [...getData()];
  },

  async getById(id) {
    await delay(200);
    const products = getData();
    const product = products.find(p => p.Id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async create(product) {
    await delay(300);
    const products = getData();
    const newId = Math.max(...products.map(p => p.Id), 0) + 1;
    const newProduct = { ...product, Id: newId };
    products.push(newProduct);
    saveData(products);
    return { ...newProduct };
  },

  async update(id, updates) {
    await delay(300);
    const products = getData();
    const index = products.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    products[index] = { ...products[index], ...updates };
    saveData(products);
    return { ...products[index] };
  },

  async delete(id) {
    await delay(300);
    const products = getData();
    const index = products.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    products.splice(index, 1);
    saveData(products);
    return { success: true };
  }
};