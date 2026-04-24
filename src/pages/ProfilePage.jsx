import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserRecipes, deleteRecipe} from '../service/recipeAPI.js';
import toast from 'react-hot-toast';
import RecipeCard from '../components/RecipeCard';
import { rehydrateAuth } from '../service/authAPI';

const ProfilePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const user = await rehydrateAuth();
        if (!user) {
          navigate('/login');
          return;
        }

        const data = await getUserRecipes();
        setRecipes(data);
      } catch (err) {
        const message = err?.message?.toLowerCase() || '';
        if (message.includes('401') || message.includes('session expired')) {
          navigate('/login');
        } else {
          setError('Failed to fetch your recipes.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserRecipes();
  }, [navigate]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Breadcrumb
  const breadcrumb = (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex text-gray-500">
        <li><a href="/" className="hover:underline text-(--color-primary)">Home</a></li>
        <li><span className="mx-2">&gt;</span></li>
        <li className="text-gray-700 font-semibold">Profile</li>
      </ol>
    </nav>
  );

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Recipe deleted');
    } catch {
      toast.error('Failed to delete recipe');
    }
  };

  return (
    <div className="profile-page max-w-4xl mx-auto p-4">
      {breadcrumb}
      <h2>Your Recipes</h2>
      {recipes.length === 0 ? (
        <p>You haven't created any recipes yet.</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
