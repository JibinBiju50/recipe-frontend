import {React, useState } from "react";
import { SearchRecipies } from "../service/recipeAPI";

export default function SearchBar({onSearch}) {
    //state to hold the values giving in searchbar
    const [searchItem, setSearchItem] = useState("");

    //function to handle the submit
    const handleSubmit = (event)=>{
        event.preventDefault();
        
        //call the prop and pass the user's search term up to the parent Homepage
        onSearch(searchItem);
    }
    
    return (
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 w-full max-w-md mx-auto mt-6">
            <input
                type="text"
                placeholder="Search recipes..."
                name="search"
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                value={searchItem}
                onChange={(event) => setSearchItem(event.target.value)}
            />
            <button type="submit" className="text-gray-500 hover:text-blue-500 border-none outline-none" style={{outline:"none"}}>
                Search
            </button>
        </form>
        
    );
}