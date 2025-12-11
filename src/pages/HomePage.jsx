import { useState } from "react";
import foodRecipe from "../assets/foodRecipe.png";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import { SearchRecipies, deleteRecipe } from "../service/recipeAPI";
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
    //state to hold recipes
    const [recipes, setRecipes] = useState([]);

    //state for loading
    const [loading, setLoading] = useState(false);

    //state for error
    const [error, setError] = useState(null);

    //state to track if search has happened
    const [hasSearched, setHasSearched] = useState(false);
    
    //function to handle the search
    const handleSearch = async (searchItem) =>{
        setLoading(true);
        setError(null);
        setRecipes([]); //clear old recipes
        setHasSearched(true);
        
        try{
            //call the API
            const apiResults = await SearchRecipies(searchItem);
            
            //update the state with our results
            setRecipes(apiResults);

        } catch(error){
            console.log("Failed to search for recipes!", error);
            setError("Could not fetch recipes! Please try again later..");
        } finally{
            setLoading(false);
        }
    }
    
    //function to handle Deletion
    const handleDelete = async (id) =>{
        try{
            //call the API
            await deleteRecipe(id)

            //update the state immedietely
            setRecipes(prevRecipes => prevRecipes.filter(r => r._id !== id))
            toast.success('Recipe deleted',{
                icon: <FontAwesomeIcon icon={faTrashCan} className="text-red-500" />
            })
        } catch(error){
            toast.error("Failed to delete the recipe")
        }
    }
    
    return (
        <main className="flex flex-col items-center justify-center min-h-screen w-full bg-linear-to-br from-blue-100 to-white px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-700 mb-2">SpoonFull</h1>
                <p className="text-lg text-gray-600">A spoonful of inspiration. Your daily source for new and exciting recipes.</p>
            </div>
            <div className="mb-8">
                <img src={foodRecipe} alt="Food Recipe" className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-white" />
            </div>
            
            <div className="w-full max-w-xl mb-8">
                <Link 
                    to="/add-recipe" 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-60">
                + Add Recipe
                </Link>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className="w-full max-w-6xl">
                {loading && (
                <p className="text-blue-600 text-center font-semibold">Loading recipes...</p>
                )}

                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}

                {!loading && !error && recipes.length > 0 && <RecipeList recipes={recipes} onDelete={handleDelete}/>}

                {!loading && !error && hasSearched && recipes.length === 0 &&  (
                    <p className="text-gray-500 text-center">No recipes found. Try a different search!</p>
                )}
            </div>   
        </main>
    );
}