import {React, useState, useEffect, useRef } from "react";
import { searchRecipes } from "../service/recipeAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function SearchBar({ onSearch }) {
    const [searchItem, setSearchItem] = useState("");
    const [allRecipes, setAllRecipes] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    // Fetch all recipe titles on mount
    useEffect(() => {
        async function fetchAll() {
            try {
                const data = await searchRecipes("");
                setAllRecipes(data.map(r => r.title));
            } catch (e) {
                setAllRecipes([]);
            }
        }
        fetchAll();
    }, []);

    // Filter suggestions as user types
    useEffect(() => {
        if (searchItem.trim() === "") {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const filtered = allRecipes.filter(title =>
            title.toLowerCase().startsWith(searchItem.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [searchItem, allRecipes]);

    // Hide suggestions on outside click
    useEffect(() => {
        function handleClick(e) {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchItem);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (title) => {
        setSearchItem(title);
        setShowSuggestions(false);
        onSearch(title);
    };

    return (
        <div className="relative w-full max-w-md md:min-w-[400px]" ref={inputRef}>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 w-full">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    name="search"
                    className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    value={searchItem}
                    onChange={(event) => setSearchItem(event.target.value)}
                    autoComplete="off"
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                />
                <button type="submit" className="text-gray-500 hover:text-gray-900 border-none outline-none" style={{ outline: "none" }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            {showSuggestions && (
                <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow z-10 max-h-56 overflow-y-auto">
                    {suggestions.map((title, idx) => (
                        <li
                            key={idx}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(title)}
                        >
                            {title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}