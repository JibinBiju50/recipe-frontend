
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../service/recipeAPI';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../service/authAPI';


export default function RecipePage() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (recipe) {
            document.title = `${recipe.title} - Spoonfull`;
        } else {
            document.title = 'Recipe - Spoonfull';
        }
    }, [recipe]);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getRecipeDetails(recipeId);
                setRecipe(data);
            } catch {
                setError('Could not fetch recipe details! Please try again later..');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [recipeId]);

    useEffect(() => {
        // Fetch user info to check if logged in and is creator
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-blue-600 text-lg font-semibold">Loading...</p></div>;
    }
    if (error) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-red-500 text-lg">{error}</p></div>;
    }

    // Only show edit button if user is logged in and is the creator
    const canEdit = user && recipe && recipe.user && (user._id === recipe.user || user.id === recipe.user);

    return (
        recipe && (
            <div className="container mx-auto p-4 max-w-4xl">
                {/* Breadcrumb */}
                <nav className="text-sm mb-4" aria-label="Breadcrumb">
                    <ol className="list-reset flex text-gray-500">
                        <li><Link to="/" className="hover:underline text-[var(--color-primary)]">Home</Link></li>
                        <li><span className="mx-2">&gt;</span></li>
                        <li className="text-gray-700 font-semibold">Recipe</li>
                    </ol>
                </nav>

                {/* Header: Title and Edit Button */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">{recipe.title}</h1>
                    {canEdit && (
                        <Link
                            to={`/edit-recipe/${recipe._id}`}
                            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-accent)] transition shadow-md font-semibold"
                        >
                            ✎ Edit Recipe
                        </Link>
                    )}
                </div>

                {/* Image Section */}
                <img
                    src={recipe.image || 'https://placehold.co/600x400?text=No+Image+Available'}
                    alt={recipe.title}
                    className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
                />

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Meta Data */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
                        <p className="text-gray-700 font-bold text-lg mb-2">⏱️ Cooking Time</p>
                        <p className="text-2xl text-blue-600">{recipe.cookingTime} mins</p>
                        <p className="text-gray-500 text-sm mt-1">Created on: {new Date(recipe.createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* Ingredients Section */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Ingredients</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Instructions</h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                        {/* whitespace-pre-wrap preserves the user's line breaks and spacing */}
                        {recipe.instructions}
                    </div>
                </div>
            </div>
        )
    );
}
