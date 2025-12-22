import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getRecipeDetails, updateRecipe} from '../service/recipeAPI'
import toast from 'react-hot-toast';
import { API_BASE } from '../config';

export default function EditRecipePage(){
    const {recipeId} = useParams();
    const navigate = useNavigate();

    // State for form fields
    const [formData, setFormData] = useState({
       title: '',
       ingredients: '', 
       instructions: '',
       cookingTime: '',
       image: ''
    });

    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false);
    //Fetch the existing data when page loads
    useEffect(()=>{
       const fetchData = async ()=>{
        try{
            const data = await getRecipeDetails(recipeId)

            //pre-fill the form with existing data
            setFormData({
              title: data.title,
              ingredients: data.ingredients.join('\n'),
              instructions: data.instructions,
              cookingTime: data.cookingTime,
              image: data.image || ''
            })
        } catch(error){
            alert("Failed to load existing recipe")
        } finally {
            setLoading(false)
        }
    }
    fetchData();
    }, [recipeId])

    //Handle Input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
    };

    //Handle image upload to cloudinary
    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

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
    
    //Handle form submission
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
    
        try {
          await updateRecipe(recipeId, formattedData);
          toast.success('Recipe Updated Successfully!');
          navigate(`/recipe/${recipeId}`); 
        } catch (error) {
          toast.error('Failed to update recipe');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return(
      <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Recipe</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Title */}
        <div>
          <label className="block font-bold mb-2">Title</label>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-bold mb-2">Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            rows={5}
            placeholder="e.g. 2 eggs\n1 cup flour\n1/2 cup sugar"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-bold mb-2">Instructions</label>
          <textarea name="instructions" value={formData.instructions} onChange={handleChange} className="w-full p-2 border rounded h-32" required />
        </div>

        {/* Cooking Time */}
        <div>
          <label className="block font-bold mb-2">Cooking Time (mins)</label>
          <input name="cookingTime" type="number" value={formData.cookingTime} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Image upload */}
        <div>
          <label className="block font-bold mb-2">Recipe Image</label>
          {formData.image && (
            <img src={formData.image} alt="current image" className="w-full h-48 object-cover rounded-lg mt-2" />
          )}
          <input
          type='file'
          name='image'
          accept='image/*'
          onChange={handleImageUpload}
          className='w-full p-2 border rounded'
          required
          />
          {uploading && <p className='text-sm text-gray-500'>Uploading image...</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
          Update Recipe
        </button>
      </form>
    </div>
  );
}