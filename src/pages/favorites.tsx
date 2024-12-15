import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Grid from 'components/sections/grid';
import petData from '../../data/pets.json';
import { useFavorites } from 'context/favoritesContext';

const FavoritesPage = () => {
    const router = useRouter();
    const { favorites } = useFavorites();

    // Filter pet data based on favorite IDs
    const favoritePets = petData.filter((pet) => favorites.some((fav) => fav.id === pet.id));

    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 9;

    const totalPages = Math.ceil(favoritePets.length / petsPerPage);

    const startIndex = (currentPage - 1) * petsPerPage;
    const endIndex = startIndex + petsPerPage;
    const currentPets = favoritePets.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="p-6">
            <main className="w-3/4 p-4 overflow-y-auto h-full">
                <div className="flex items-center mb-6">
                    <div className="flex-grow border-t border-blue-700"></div>
                    <h1 className="text-center font-bold text-2xl mx-4 text-blue-700">
                        Your Favorite Fur Friends
                    </h1>
                    <div className="flex-grow border-t border-blue-700"></div>
                </div>

                {currentPets.length > 0 ? (
                    <Grid items={currentPets} />
                ) : (
                    <p className="text-center text-gray-600">
                        You haven't added any favorites yet.
                    </p>
                )}

                {favoritePets.length > petsPerPage && (
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`px-4 py-2 rounded ${
                                currentPage === 1
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Previous
                        </button>
                        <span className="text-lg font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`px-4 py-2 rounded ${
                                currentPage === totalPages
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FavoritesPage;