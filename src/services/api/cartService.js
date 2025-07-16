const STORAGE_KEY = "stylehub_cart";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize localStorage with empty cart if not exists
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

export const cartService = {
  async getAll() {
    await delay(300);
    return [...getData()];
  },

  async getById(id) {
    await delay(200);
    const cartItems = getData();
    const item = cartItems.find(i => i.Id === id);
    if (!item) {
      throw new Error("Cart item not found");
    }
    return { ...item };
  },

  async add(cartItem) {
    await delay(300);
    const cartItems = getData();
    
    // Check if item already exists with same product and size
    const existingIndex = cartItems.findIndex(
      item => item.productId === cartItem.productId && item.size === cartItem.size
    );
    
    if (existingIndex !== -1) {
      // Update quantity if item exists
      cartItems[existingIndex].quantity += cartItem.quantity;
    } else {
      // Add new item
      const newId = Math.max(...cartItems.map(i => i.Id), 0) + 1;
      const newItem = { ...cartItem, Id: newId };
      cartItems.push(newItem);
    }
    
    saveData(cartItems);
    return { success: true };
  },

  async update(id, updates) {
    await delay(300);
    const cartItems = getData();
    const index = cartItems.findIndex(i => i.Id === id);
    if (index === -1) {
      throw new Error("Cart item not found");
    }
    cartItems[index] = { ...cartItems[index], ...updates };
    saveData(cartItems);
    return { ...cartItems[index] };
  },

  async delete(id) {
    await delay(300);
    const cartItems = getData();
    const index = cartItems.findIndex(i => i.Id === id);
    if (index === -1) {
      throw new Error("Cart item not found");
    }
    cartItems.splice(index, 1);
    saveData(cartItems);
    return { success: true };
  },

  async clear() {
    await delay(200);
    saveData([]);
    return { success: true };
  }
};