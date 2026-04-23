

import { API_BASE } from '../config';
import { fetchWithAuth } from './fetchWithAuth';

const API_URL = `${API_BASE}/api/v1/recipes`;

// Public: Search and get recipes with pagination
export const searchRecipes = async (query, page = 1, limit = 8) => {
  const params = new URLSearchParams();
  if (query) params.append('title', query);
  params.append('page', page);
  params.append('limit', limit);
  const url = `${API_URL}?${params.toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Public: Get recipe details
export const getRecipeDetails = async (id) => {
  const url = `${API_URL}/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Could not fetch recipe details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Protected: Get recipes by logged-in user
export const getUserRecipes = async () => {
  const url = `${API_URL}/user/profile`;
  try {
    const response = await fetchWithAuth(url, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch user recipes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
};

// Protected: Create and save recipe
export const createRecipe = async (recipeData) => {
  const url = API_URL;
  try {
    const response = await fetchWithAuth(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) throw new Error('Failed to create recipe');
    return await response.json();
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Protected: Delete recipe
export const deleteRecipe = async (id) => {
  const url = `${API_URL}/${id}`;
  try {
    const response = await fetchWithAuth(url, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete recipe');
    return await response.json();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

// Protected: Update recipe
export const updateRecipe = async (id, recipeData) => {
  const url = `${API_URL}/${id}`;
  try {
    const response = await fetchWithAuth(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) throw new Error('Failed to update recipe');
    return await response.json();
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};
// Protected: Upload recipe image
export const uploadRecipeImage = async (formData) => {
  const url = `${API_URL}/upload`;
  try {
    const response = await fetchWithAuth(url, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


