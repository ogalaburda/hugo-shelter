import React, { createContext, useContext, useState } from 'react';

// Define the shape of a Favorite item
interface Favorite {
    id: string;
    name: string; // Include other properties if needed
    [key: string]: any;
}

interface FavoritesContextType {
    favorites: Favorite[]; // Store the full objects
    addFavorite: (item: Favorite) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider Component
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const addFavorite = (item: Favorite) => {
        if (!favorites.some((fav) => fav.id === item.id)) {
            setFavorites((prev) => [...prev, item]);
        }
    };

    const removeFavorite = (id: string) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.some((fav) => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom Hook
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};