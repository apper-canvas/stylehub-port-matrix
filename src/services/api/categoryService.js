import categoriesData from "@/services/mockData/categories.json";

const STORAGE_KEY = "stylehub_categories";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with mock data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriesData));
  }
};

const getData = () => {
  initializeData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const categoryService = {
  async getAll() {
    await delay(300);
    return [...getData()];
  },

  async getById(id) {
    await delay(200);
    const categories = getData();
    const category = categories.find(c => c.Id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(category) {
    await delay(300);
    const categories = getData();
    const newId = Math.max(...categories.map(c => c.Id), 0) + 1;
    const newCategory = { ...category, Id: newId };
    categories.push(newCategory);
    saveData(categories);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(300);
    const categories = getData();
    const index = categories.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories[index] = { ...categories[index], ...updates };
    saveData(categories);
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(300);
    const categories = getData();
    const index = categories.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories.splice(index, 1);
    saveData(categories);
    return { success: true };
  }
};