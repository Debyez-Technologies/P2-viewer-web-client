import { useState, useEffect, useRef } from "react";
import { usePublicationStore } from "../../../store/publication-store";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

const SearchBar = ({ type }) => {
    const [query, setQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown visibility
    const {
        textNodes,
        searchContent,
        navigateToKey,
        resetTextNodes,
        projectGroup,
    } = usePublicationStore();
    const searchBarRef = useRef(null); // Ref for the search bar container
    const navigate = useNavigate();

    useEffect(() => {
        const timerId = setTimeout(() => {
            searchContent(query, type);
            if (query.length > 0) {
                // Open dropdown only if there's a query
                setIsDropdownOpen(true);
            } else {
                setIsDropdownOpen(false);
            }
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [query, searchContent, type]); // Added 'type' to dependency array

    // Effect to handle clicks outside the search bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchBarRef]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    const handleResultClick = (result) => {
        if (type === "global") {
            navigate("/ietm/view");
        }
        navigateToKey(result.key);
        resetTextNodes();
        setQuery(""); // Optionally set the query to the clicked result's title
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const handleInputFocus = () => {
        // Open dropdown on focus if there's a query or if results are available from a previous search
        if (query.length > 0 || textNodes.length > 0) {
            setIsDropdownOpen(true);
        }
    };

    return (
        <div className="relative w-1/3" ref={searchBarRef}>
            {" "}
            {/* Attach ref here */}
            <div className="">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="text-slate-400"/>
                </div>
                <input
                    type="text"
                    name="search-box"
                    id="search-box"
                    className="w-full rounded-xl p-3 pl-10 bg-slate-100 focus:border-gray-300 focus:border-transparent outline-none"
                    placeholder={
                        type === "local"
                            ? `Search in ${projectGroup}...`
                            : `Search...`
                    }
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus} // Open dropdown on focus if there are results
                    autoComplete="off"
                />
            </div>
            {isDropdownOpen && ( // Conditionally render based on isDropdownOpen
                <SearchResultsDropdown
                    results={textNodes}
                    onResultClick={handleResultClick}
                />
            )}
        </div>
    );
};

export default SearchBar;

/**
 * A presentational component that displays a list of search results.
 * @param {object} props - The component props.
 * @param {Array} props.results - An array of objects to display as results. Each object should have a 'title' and 'key'.
 * @param {function(object): void} props.onResultClick - The function to call when a result is clicked.
 */
const SearchResultsDropdown = ({ results, onResultClick }) => {
    return (
        <div className="absolute mt-1 w-full bg-white border rounded-xl border-gray-300 rounded-md shadow-lg z-20">
            <ul className="overflow-y-auto p-2 max-h-32 list-none">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <li
                            key={`result-${index}`} // Use result.key or fallback to index
                            className={`p-3 cursor-pointer rounded-xl ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"} hover:bg-purple-100`} // Alternating colors and hover effect
                            onClick={() => onResultClick(result)}
                        >
                            {result.title.length > 150
                                ? `${result.title.substring(0, 120)}...`
                                : result.title}
                        </li>
                    ))
                ) : (
                    <li className=" text-gray-500 italic">No results found</li>
                )}
            </ul>
        </div>
    );
};
