import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe, uploadRecipeImage } from '../service/recipeAPI';
import toast from 'react-hot-toast';
import { checkAuth } from '../service/authAPI';

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
   const toastShown = useRef(false);

  // Only render form if authenticated
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    document.title = "Add Recipe - Spoonfull";
    (async () => {
      const auth = await checkAuth();
      setIsAuth(auth);
      setAuthChecked(true);
      if (!auth && !toastShown.current) {
        toastShown.current = true;
        toast('Please login to add a recipe', {
          icon: '',
          style: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' },
        });
        navigate('/login', { replace: true });
      }
    })();
  }, [navigate]);

  //function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const data = await uploadRecipeImage(uploadData);
      setFormData(prev => ({ ...prev, image: data.imageUrl }));
    } catch {
      toast('Failed to upload image', {
        icon: '',
        style: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' },
      });
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

  if (!authChecked) return null;
  if (!isAuth) return null;

  // Breadcrumb
  const breadcrumb = (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex text-gray-500">
        <li><a href="/" className="hover:underline text-(--color-primary)">Home</a></li>
        <li><span className="mx-2">&gt;</span></li>
        <li className="text-gray-700 font-semibold">Add Recipe</li>
      </ol>
    </nav>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {breadcrumb}
      <h1 className="text-3xl font-bold mb-6 text-center text-(--color-primary)">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-(--color-bg) p-6 rounded-xl shadow-lg space-y-6 border border-(--color-accent)">
        {/* Title Input */}
        <div>
          <label className="block text-(--color-primary) font-semibold mb-2">Title</label>
          <input 
            name="title" 
            type="text" 
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font) placeholder-gray-400"
            placeholder="e.g. Spicy Tacos"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {/* Ingredients Input */}
        <div>
          <label className="block text-(--color-primary) font-semibold mb-2">Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font) placeholder-gray-400"
            placeholder={"e.g. 2 eggs\n1 cup flour\n1/2 cup sugar"}
            value={formData.ingredients}
            onChange={handleChange}
            rows={5}
          />
        </div>
        {/* Instructions Input */}
        <div>
          <label className="block text-(--color-primary) font-semibold mb-2">Instructions</label>
          <textarea 
            name="instructions" 
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font) placeholder-gray-400"
            placeholder="1..."
            value={formData.instructions}
            onChange={handleChange}
            rows={8}
          />
        </div>
        {/* Cooking Time Input */}
        <div>
          <label className="block text-(--color-primary) font-semibold mb-2">Cooking Time (minutes)</label>
          <input
            name="cookingTime"
            type="number"
            min="1"
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font) placeholder-gray-400"
            placeholder="e.g. 30"
            value={formData.cookingTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-(--color-primary) font-semibold mb-2">Recipe Image</label>
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
          className="w-full bg-(--color-primary) text-white font-bold py-3 px-4 rounded-lg hover:bg-(--color-accent) hover:text-white! transition-colors duration-200 shadow"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;
