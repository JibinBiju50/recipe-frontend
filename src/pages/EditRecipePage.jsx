import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getRecipeDetails, updateRecipe} from '../service/recipeAPI'
import toast from 'react-hot-toast';


export default function EditRecipePage(){
    const {recipeId} = useParams();

    const navigate = useNavigate();

    // State for form fields
    const [formData, setFormData] = useState({
       title: '',
       ingredients: '', 
       instructions: '',
       cookingTime: ''
    });

    const [loading, setLoading] = useState(true)
    
    //Fetch the existing data when page loads
    useEffect(()=>{
       const fetchData = async ()=>{
        try{
            const data = await getRecipeDetails(recipeId)

            //pre-fill the form with existing data
            setFormData({
                title: data.title,
                ingredients: data.ingredients.join(', '),
                instructions: data.instructions,
                cookingTime: data.cookingTime
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare data for backend
        // 1. Split ingredients string into an array: "pasta, sauce" -> ["pasta", "sauce"]
        const formattedData = {
          ...formData,
          ingredients: formData.ingredients.split(',').map(item => item.trim()),
          cookingTime: Number(formData.cookingTime)
        };
    
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
          <label className="block font-bold mb-2">Ingredients (comma separated)</label>
          <input name="ingredients" value={formData.ingredients} onChange={handleChange} className="w-full p-2 border rounded" required />
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

        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
          Update Recipe
        </button>
      </form>
    </div>
  );
}