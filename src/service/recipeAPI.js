
const API_URL = "https://recipe-backend-xdi5.onrender.com";

//function to search and get the recipes
export const SearchRecipies = async (query) => {
  const url = query ? `${API_URL}?title=${encodeURIComponent(query)}` : API_URL;
  console.log("Fetching recipes from:", url);

  try {
    const response = await fetch(url);

    if(!response.ok){
      throw new Error(`Failed to fetch recipes`);
    }

    return await response.json()

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

//function to get all recipes
export const getRecipeDetails = async (id) => {
  const url = `${API_URL}/${id}`
  console.log("fetching details from ", url);
  
  try {
    const response = await fetch(url);

    if(!response.ok){
      throw new Error('Could not fetch recipe details');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

//function to create and save recipe

export const createRecipe = async (recipeData) => {
  const url = API_URL; 

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convert the JS object to a JSON string
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) throw new Error('Failed to create recipe');
    return await response.json();

  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

//function to delete recipe
export const deleteRecipe = async (id) => {
  const url = `${API_URL}/${id}`; 

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete recipe');
    return await response.json();

  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (id, recipeData) => {
  const url = `${API_URL}/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convert the JS object to a JSON string
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) throw new Error('Failed to update recipe');
    return await response.json();

  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};


