const STORAGE_KEY = "stylehub_wishlist";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with empty wishlist if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

const getData = () => {
  initializeData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const wishlistService = {
  async getAll() {
    await delay(300);
    return [...getData()];
  },

  async getById(id) {
    await delay(200);
    const wishlistItems = getData();
    const item = wishlistItems.find(i => i.Id === id);
    if (!item) {
      throw new Error("Wishlist item not found");
    }
    return { ...item };
  },

  async add(productId) {
    await delay(300);
    const wishlistItems = getData();
    
    // Check if item already exists
    const existingIndex = wishlistItems.findIndex(
      item => item.productId === productId
    );
    
    if (existingIndex === -1) {
      // Add new item
      const newId = Math.max(...wishlistItems.map(i => i.Id), 0) + 1;
      const newItem = { Id: newId, productId, addedAt: new Date().toISOString() };
      wishlistItems.push(newItem);
      saveData(wishlistItems);
    }
    
    return { success: true };
  },

  async remove(productId) {
    await delay(300);
    const wishlistItems = getData();
    const index = wishlistItems.findIndex(i => i.productId === productId);
    if (index !== -1) {
      wishlistItems.splice(index, 1);
      saveData(wishlistItems);
    }
    return { success: true };
  },

  async clear() {
    await delay(200);
    saveData([]);
    return { success: true };
  }
};