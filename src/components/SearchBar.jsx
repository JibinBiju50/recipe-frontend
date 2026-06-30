import { useState, useEffect, useRef } from "react";
import { searchRecipes } from "../service/recipeAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MIN_CHARS = 2;       // Start fetching suggestions after 2 characters
const DEBOUNCE_MS = 300;   // Wait 300ms after the user stops typing

export default function SearchBar({ onSearch }) {
    const [searchItem, setSearchItem] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const debounceTimer = useRef(null);

    // Fetch suggestions from API when user types 2+ characters, with debounce
    useEffect(() => {
        // Clear any pending timer from the previous keystroke
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        const trimmed = searchItem.trim();

        // Not enough characters — clear suggestions and don't fetch
        if (trimmed.length < MIN_CHARS) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Wait 300ms after the user stops typing, then fetch
        debounceTimer.current = setTimeout(async () => {
            try {
                const data = await searchRecipes(trimmed, 1, 8);
                const titles = data.recipes.map(r => r.title);
                setSuggestions(titles);
                setShowSuggestions(titles.length > 0);
            } catch {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, DEBOUNCE_MS);

        // Cleanup: cancel the timer if the component unmounts or searchItem changes again
        return () => clearTimeout(debounceTimer.current);
    }, [searchItem]);

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
