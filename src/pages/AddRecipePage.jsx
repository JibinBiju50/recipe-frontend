import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../service/recipeAPI';
import toast from 'react-hot-toast';
import { API_BASE } from '../config';
function AddRecipePage() {
  const navigate = useNavigate(); // Hook to move between pages
  
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '', 
    instructions: '',
    cookingTime: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(()=>{
    document.title = "Add Recipe - Spoonfull";
  }, []);
  //function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try{
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: uploadData
      })
      const data = await response.json();
      setFormData(prev => ({...prev, image: data.imageUrl}));
    } catch(error){
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
    }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for backend
    // 1. Split ingredients by newlines: "egg\nflour" -> ["egg", "flour"]
    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split('\n').map(item => item.trim()).filter(Boolean),
      cookingTime: Number(formData.cookingTime)
    };

    console.log("Sending to backend:", formattedData);  // ← Add this
    console.log("Image URL:", formattedData.image);  

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
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-[var(--color-bg)] p-6 rounded-xl shadow-lg space-y-6 border border-[var(--color-accent)]">
        {/* Title Input */}
        <div>
          <label className="block text-[var(--color-primary)] font-semibold mb-2">Title</label>
          <input 
            name="title" 
            type="text" 
            required
            className="w-full p-3 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white text-[var(--color-font)] placeholder-gray-400"
            placeholder="e.g. Spicy Tacos"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {/* Ingredients Input */}
        <div>
          <label className="block text-[var(--color-primary)] font-semibold mb-2">Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            required
            className="w-full p-3 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white text-[var(--color-font)] placeholder-gray-400"
            placeholder={"e.g. 2 eggs\n1 cup flour\n1/2 cup sugar"}
            value={formData.ingredients}
            onChange={handleChange}
            rows={5}
          />
        </div>
        {/* Instructions Input */}
        <div>
          <label className="block text-[var(--color-primary)] font-semibold mb-2">Instructions</label>
          <textarea 
            name="instructions" 
            required
            className="w-full p-3 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white text-[var(--color-font)] placeholder-gray-400"
            placeholder="1..."
            value={formData.instructions}
            onChange={handleChange}
            rows={8}
          />
        </div>
        {/* Cooking Time Input */}
        <div>
          <label className="block text-[var(--color-primary)] font-semibold mb-2">Cooking Time (minutes)</label>
          <input 
            name="cookingTime" 
            type="number" 
            required
            className="w-full p-3 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white text-[var(--color-font)] placeholder-gray-400"
            value={formData.cookingTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-[var(--color-primary)] font-semibold mb-2">Recipe Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full p-3 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white text-[var(--color-font)] placeholder-gray-400"
            onChange={handleImageUpload}
          />
          {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          {formData.image && <img src={formData.image} alt="Recipe" className="w-full h-48 object-cover rounded-lg mt-2" />}
        </div>
        <button 
          type="submit" 
          className="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-4 rounded-lg hover:bg-[var(--color-accent)] hover:!text-white transition-colors duration-200 shadow"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;