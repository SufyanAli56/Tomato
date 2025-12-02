const API_BASE = "http://localhost:4000/practice/menu";

export interface MenuItem {
  _id: string;
  id?: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
  ingredients: string[];
  isVegetarian: boolean;
  isSpicy: boolean;
  preparationTime: number;
  available: boolean;
  popular?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  description: string;
}

// Get all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(API_BASE);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu items: ${response.status}`);
  }
  
  const data = await response.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id, // Add id field for compatibility
  }));
}

// Get menu items by category
export async function getMenuByCategory(category: string): Promise<MenuItem[]> {
  const response = await fetch(`${API_BASE}/category/${category}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu by category: ${response.status}`);
  }
  
  const data = await response.json();
  return data.map((item: any) => ({
    ...item,
    id: item._id,
  }));
}

// Get menu categories
export async function getMenuCategories(): Promise<{ categories: string[] }> {
  const response = await fetch(`${API_BASE}/categories`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  
  return response.json();
}

// Get menu count
export async function getMenuCount(): Promise<{ count: number }> {
  const response = await fetch(`${API_BASE}/count`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu count: ${response.status}`);
  }
  
  return response.json();
}