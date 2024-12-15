import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface SearchProps {
    items: { id: string; name: string }[]; // Include `id` for URL construction
}

const Search: React.FC<SearchProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<{ id: string; name: string }[]>([]);

    const searchRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        // Filter suggestions based on the entered value
        const filteredSuggestions = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setSuggestions([]); // Clear the suggestions dropdown
            setSearchTerm(''); // Clear the input field
        }
    };

    const handleSuggestionClick = () => {
        setSearchTerm(''); // Clear the input
        setSuggestions([]); // Clear the suggestions dropdown
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={searchRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search pets..."
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.id}>
                            <Link
                                href={`/pets/adopt/${suggestion.id}`}
                                className="block p-2 cursor-pointer hover:bg-blue-100"
                                onClick={handleSuggestionClick} // Clear input and dropdown
                            >
                                {suggestion.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;