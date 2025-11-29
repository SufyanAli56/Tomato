// lib/services/recipesApi.ts
const API_BASE = "http://localhost:4000/recipes";

export async function getAllRecipes() {
  const response = await fetch(API_BASE);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`);
  }
  
  return response.json();
}

export async function getRecipeById(id: string) {
  const response = await fetch(`${API_BASE}/${id}`);
  return response.json();
}

export async function createRecipe(data: any) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateRecipe(id: string, data: any) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteRecipe(id: string) {
  const response = await fetch(`${API_BASE}/${id}`, { 
    method: "DELETE" 
  });
  return response.json();
}