import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../service/recipeAPI';
import toast from 'react-hot-toast';

function AddRecipePage() {
  const navigate = useNavigate(); // Hook to move between pages
  
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '', 
    instructions: '',
    cookingTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for backend
    // 1. Split ingredients string into an array: "pasta, sauce" -> ["pasta", "sauce"]
    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(item => item.trim()),
      cookingTime: Number(formData.cookingTime)
    };

    await toast.promise(
    createRecipe(formattedData),
    {
      loading: 'Saving your delicious recipe...',
      success: 'Recipe saved! 🍳',
      error: 'Could not save.',
    }
  );
  navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input 
            name="title" 
            type="text" 
            required
            className="w-full p-2 border rounded"
            placeholder="e.g. Spicy Tacos"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Ingredients Input */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Ingredients (comma separated)</label>
          <input 
            name="ingredients" 
            type="text" 
            required
            className="w-full p-2 border rounded"
            placeholder="e.g. Tortilla, Beef, Cheese"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>

        {/* Instructions Input */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Instructions</label>
          <textarea 
            name="instructions" 
            required
            className="w-full p-2 border rounded h-32"
            placeholder="Step 1..."
            value={formData.instructions}
            onChange={handleChange}
          />
        </div>

        {/* Cooking Time Input */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Cooking Time (minutes)</label>
          <input 
            name="cookingTime" 
            type="number" 
            required
            className="w-full p-2 border rounded"
            value={formData.cookingTime}
            onChange={handleChange}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
          Save Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;