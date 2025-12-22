import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { searchRecipes, deleteRecipe } from "../service/recipeAPI";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import heroImage from '../assets/burger-image.png';
import aboutBgImage from '../assets/About bg image.jpg';
import logo from '../assets/logo.png';

export default function HomePage() {
    //state to hold recipes
    const [recipes, setRecipes] = useState([]);
    //state for loading
    const [loading, setLoading] = useState(false);
    //state for error
    const [error, setError] = useState(null);
    //state to track if search has happened
    const [hasSearched, setHasSearched] = useState(false);
    //state for initial recent recipes
    const [recentRecipes, setRecentRecipes] = useState([]);
    //function to handle the search
    const handleSearch = async (searchItem) =>{
        setLoading(true);
        setError(null);
        setRecipes([]); //clear old recipes
        setHasSearched(true);
        try{
            //call the API
            const apiResults = await searchRecipes(searchItem);
            //update the state with our results
            setRecipes(apiResults);
        } catch(error){
            console.log("Failed to search for recipes!", error);
            setError("Could not fetch recipes! Please try again later..");
        } finally{
            setLoading(false);
        }
    }

    // Fetch recent recipes on mount
    useEffect(() => {
        async function fetchRecent() {
            setLoading(true);
            setError(null);
            try {
                const apiResults = await searchRecipes(""); // fetch all or recent
                setRecentRecipes(apiResults.slice(0, 8));
            } catch (error) {
                setError("Could not fetch recipes! Please try again later..");
            } finally {
                setLoading(false);
            }
        }
        fetchRecent();
    }, []);
    //function to handle Deletion
    const handleDelete = async (id) => {
        try {
            await deleteRecipe(id);
            // Update both states depending on which is shown
            setRecipes(prevRecipes => prevRecipes.filter(r => r._id !== id));
            setRecentRecipes(prevRecent => prevRecent.filter(r => r._id !== id));
            toast.success('Recipe deleted', {
                icon: <FontAwesomeIcon icon={faTrashCan} className="text-red-500" />
            });
        } catch (error) {
            toast.error("Failed to delete the recipe");
        }
    }
    // Add padding top to prevent content being hidden behind navbar
    return (
        <>
        <main className="w-full px-4 pt-24 bg-[var(--color-bg)] text-[var(--color-font)] overflow-x-hidden">
            {/* hero section */}
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-12 mt-8 gap-8">
                {/* Left: Heading, paragraph, link */}
                <div className="flex-1 flex flex-col items-start text-left">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--color-primary)]">Cooking Made Fun and Easy: Unleash Your Inner Chef</h1>
                    <p className="text-lg mb-6">Discover more than 10,000 recipes in your hand with the best recipe. Help you to find the easiest way to cook.</p>
                    <div className="flex flex-row gap-4 mb-4">
                      <a 
                          href="#recipe-list" 
                          className="bg-[var(--color-primary)] text-white px-4 md:px-6 py-3 rounded shadow font-semibold text-md md:text-lg transition-colors duration-200 hover:bg-[var(--color-accent)]"
                      >
                          Explore Recipes
                      </a>
                      <Link
                          to="/add-recipe"
                          className="border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-6 py-3 rounded font-semibold text-md md:text-lg transition-colors duration-200 hover:bg-[var(--color-accent)] hover:!text-white"
                      >
                          Add yours
                      </Link>
                    </div>
                </div>
                {/* Right: Image */}
                <div className="flex-1 flex justify-center">
                    <img src={heroImage} alt="Food Recipe" className="w-full max-w-md h-auto object-contain" />
                </div>
            </div>

            {/* Available Recipes section */}
            <div className="mb-8 md:mb-16 md:mt-4 text-center">
                <h2 className="text-2xl font-semibold mb-2 text-[var(--color-primary)]">Available Recipes</h2>
                <div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
                    <div className="bg-[var(--color-accent)] rounded-xl px-4 py-2 shadow text-[var(--color-font)] font-medium text-md md:text-lg min-w-[150px] flex items-center justify-center">Chapati</div>
                    <div className="bg-[var(--color-accent)] rounded-xl px-4 py-2 shadow text-[var(--color-font)] font-medium text-md md:text-lg min-w-[150px] flex items-center justify-center">Chicken Biriyani</div>
                    <div className="bg-[var(--color-accent)] rounded-xl px-4 py-2 shadow text-[var(--color-font)] font-medium text-md md:text-lg min-w-[150px] flex items-center justify-center">Egg Roast</div>
                    <div className="bg-[var(--color-accent)] rounded-xl px-4 py-2 shadow text-[var(--color-font)] font-medium text-md md:text-lg min-w-[150px] flex items-center justify-center">Masala Dosa</div>
                </div>
            </div>
            {/* Discover, Create, Share section with search bar and recipe cards */}
            <section id="recipe-list" className="w-full max-w-7xl mx-auto mb-12 mt-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className="text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-1">Discover Recipes</h1>
                        <p className="text-[var(--color-font)] text-base md:text-lg">Check our most popular recipes of this week</p>
                    </div>
                    <div className="flex-shrink-0">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                {loading && (
                   <p className="text-center font-semibold text-[var(--color-accent)]">Loading recipes...</p>
                )}
                {error && (
                    <p className="text-center text-red-600">{error}</p>
                )}
                {/* Show up to 6 most recent recipes as cards */}
                <div className="flex flex-wrap justify-center gap-8 w-full">
                    {!loading && !error && (hasSearched ? recipes.slice(0, 8).map(recipe => (
                        <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDelete} />
                    )) : recentRecipes.map(recipe => (
                        <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDelete} />
                        ))
                    )}
                </div>
                {/* No recipes found message */}
                {!loading && !error && hasSearched && recipes.length === 0 &&  (
                    <p className="text-center text-gray-500 mt-8">No recipes found. Try a different search!</p>
                )}
            </section>

            {/* About section - Full width background */}
            <section 
                id="about" 
                className="relative w-screen left-1/2 -translate-x-1/2 mb-12 mt-16 min-h-[500px] md:min-h-[550px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${aboutBgImage})` }}
            >
                {/* Dark overlay for better readability */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Content container - maintains max-width alignment */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center h-full min-h-[500px] md:min-h-[550px] px-4 md:px-12 py-10">
                    
                    {/* About card - positioned on the right */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md relative">
                        {/* Decorative bread icon */}
                        <span className="absolute top-4 right-4 text-3xl">🥖</span>
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
                            About Us
                        </h2>
                        <p className="text-[var(--color-font)] text-base leading-relaxed mb-6">
                            Our recipes are the heart and soul of our culinary community, and they reflect our commitment to providing you with memorable and delightful dining experiences.
                        </p>
                        <a 
                            href="#recipe-list" 
                            className="inline-block bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[var(--color-accent)] hover:shadow-lg"
                        >
                            Learn More
                        </a>
                        
                        {/* Decorative avocado icon */}
                        <span className="absolute bottom-4 right-4 text-3xl">🥑</span>
                    </div>
                </div>
            </section>

        </main>

            {/* Footer with Newsletter */}
            <footer className="w-full mt-16">
                {/* Newsletter Section */}
                <div className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-6 md:px-12 py-12 md:py-16 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 text-4xl opacity-20">🍕</div>
                    <div className="absolute bottom-4 right-4 text-4xl opacity-20">🍔</div>
                    <div className="absolute top-1/2 left-8 text-3xl opacity-15 hidden md:block">🥗</div>
                    <div className="absolute top-8 right-12 text-3xl opacity-15 hidden md:block">🍰</div>
                    
                    <div className="relative flex flex-col items-center text-center max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Get Fresh Recipes Weekly! 🍳
                        </h2>
                        <p className="text-white/90 text-lg max-w-xl mb-8">
                            Subscribe to our newsletter and receive delicious recipes, cooking tips, and exclusive content straight to your inbox.
                        </p>
                        
                        {/* Email form */}
                        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full text-[var(--color-font)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-white text-[var(--color-accent)] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-[var(--color-font)] hover:text-white shadow-lg hover:shadow-xl"
                            >
                                Subscribe
                            </button>
                        </form>
                        
                        <p className="text-white/70 text-sm mt-4">
                            🔒 No spam, unsubscribe anytime. Join 10,000+ food lovers!
                        </p>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="w-full bg-[var(--color-font)] text-white px-6 md:px-12 py-12">
                    <div className="max-w-7xl mx-auto">
                        {/* Footer Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            
                            {/* Brand Section */}
                            <div className="md:col-span-1">
                            <div>
          <img src={logo} alt="Logo" className="w-20 h-12" />
      </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Discover delicious recipes from around the world. Cook, share, and enjoy amazing meals with your loved ones.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Home</a></li>
                                    <li><a href="#recipe-list" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Recipes</a></li>
                                    <li><a href="#about" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">About Us</a></li>
                                    <li><Link to="/add-recipe" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Add Recipe</Link></li>
                                </ul>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">Categories</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Breakfast</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Lunch</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Dinner</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Desserts</a></li>
                                </ul>
                            </div>

                            {/* Connect */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">Connect With Us</h4>
                                <div className="flex gap-4 mb-4">
                                    <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                                        <FontAwesomeIcon icon={faFacebook} className="text-white text-lg" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                                        <FontAwesomeIcon icon={faInstagram} className="text-white text-lg" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                                        <FontAwesomeIcon icon={faTwitter} className="text-white text-lg" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                                        <FontAwesomeIcon icon={faYoutube} className="text-white text-lg" />
                                    </a>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Follow us for daily recipes and cooking inspiration!
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-700 pt-8">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-gray-400 text-sm">
                                    © 2025 Spoonfull. All rights reserved.
                                </p>
                                <div className="flex gap-6 text-sm">
                                    <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
                                    <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
                                    <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}