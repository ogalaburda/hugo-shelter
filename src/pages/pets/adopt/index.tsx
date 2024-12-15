import React, { useState } from 'react';
import Filter from 'components/blocks/filterBox';
import Grid from '../../../components/sections/grid';
import petData from '../../../../data/pets.json';
import { calculateAge } from '../../../utils/ageCalculator';
import { calculateShelterTime } from '../../../utils/timeInShelterCalculator';
import { weightRanges, ageRanges } from 'utils/utils';

const Adopt = () => {
    // Add `age` and `timeInShelter` dynamically to pet data
    const petsData = petData.map((pet) => ({
        ...pet,
        age: pet.dob ? calculateAge(pet.dob) : 'unknown', // Dynamically calculate age
        timeInShelter: calculateShelterTime(pet.dis) // Dynamically calculate time in shelter
    }));

    // Initialize state with transformed data
    const [filteredData, setFilteredData] = useState(petsData);
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 9;

    // Calculate the current page data
    const startIndex = (currentPage - 1) * petsPerPage;
    const endIndex = startIndex + petsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / petsPerPage);


    const handleFilterChange = (filters: Record<string, any>) => {
        let updatedData = [...petsData];

        // Filter by type
        if (filters.type?.length) {
            updatedData = updatedData.filter((pet) => filters.type.includes(pet.type));
        }

        // Filter by age
        if (filters.age?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.age.some((range) => (range === 'unknown' ? pet.age === 'unknown' : pet.age !== 'unknown' && ageRanges[range]?.(pet.age as number)))
            );
        }

        // Filter by breed
        if (filters.breed?.length) {
            updatedData = updatedData.filter((pet) => filters.breed.some((breed) => (breed === 'unknown' ? !pet.breed : pet.breed === breed)));
        }

        // Sort by timeInShelter
        if (filters.sort) {
            updatedData.sort((a, b) => {
                const isUnknownA = a.timeInShelter === 'unknown';
                const isUnknownB = b.timeInShelter === 'unknown';

                // Ensure 'unknown' values always appear first
                if (isUnknownA && !isUnknownB) return -1;
                if (!isUnknownA && isUnknownB) return 1;

                // If neither or both are 'unknown', sort numerically
                if (filters.sort === 'asc') {
                    return (a.timeInShelter as number) - (b.timeInShelter as number);
                } else {
                    return (b.timeInShelter as number) - (a.timeInShelter as number);
                }
            });
        }

        // Filter by location
        if (filters.location?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.location.some((location) =>
                    location === 'unknown'
                        ? !pet.location || pet.location.trim() === '' // Match pets with empty or missing location
                        : pet.location.toLowerCase() === location.toLowerCase()
                )
            );
        }

        // Filter by weight
        if (filters.weight?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.weight.some(
                    (range) =>
                        range === 'unknown'
                            ? !pet.weight || pet.weight.trim() === '' // Match empty or missing weight
                            : weightRanges[range]?.(parseFloat(pet.weight)) // Match valid weight ranges
                )
            );
        }

        // Filter by sex
        if (filters.sex?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.sex.some((sex) => (sex === 'unknown' ? !pet.sex || pet.sex.trim() === '' : pet.sex && pet.sex.toLowerCase() === sex.toLowerCase()))
            );
        }

        // Filter by color
        if (filters.color?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.color.some((color) =>
                    color === 'unknown' ? !pet.color || pet.color.trim() === '' : pet.color && pet.color.toLowerCase() === color.toLowerCase()
                )
            );
        }

        // Filter by personality
        if (filters.personality?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.personality.some(
                    (selectedTrait) =>
                        selectedTrait === 'unknown'
                            ? !pet.personality || pet.personality.length === 0 // Match pets with no personality
                            : pet.personality?.map((trait) => trait.toLowerCase()).includes(selectedTrait.toLowerCase()) // Match pets with traits
                )
            );
        }

        // Filter by status
        if (filters.status?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.status.some(
                    (status) =>
                        status === 'unknown'
                            ? !pet.status || pet.status.trim() === '' // Match pets with empty or missing status
                            : pet.status && pet.status.toLowerCase() === status.toLowerCase() // Ensure pet.status is not undefined
                )
            );
        }

        // Filter by goodWithCats
        if (filters.goodWithCats?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.goodWithCats.some((value) =>
                    value === 'unknown'
                        ? !pet.goodWithCats || pet.goodWithCats.trim() === '' // Match pets with empty or undefined values
                        : pet.goodWithCats?.toLowerCase() === value.toLowerCase()
                )
            );
        }

        // Filter by goodWithDogs
        if (filters.goodWithDogs?.length) {
            updatedData = updatedData.filter((pet) =>
                filters.goodWithDogs.some((value) =>
                    value === 'unknown'
                        ? !pet.goodWithDogs || pet.goodWithDogs.trim() === '' // Match pets with empty or undefined values
                        : pet.goodWithDogs?.toLowerCase() === value.toLowerCase()
                )
            );
        }

        setFilteredData(updatedData);
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="flex h-screen">
            {/* Left rail with filters */}
            <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto h-full sticky top-0">
                <div className="mt-4 text-lg font-semibold">
                    Total Results: {filteredData.length}
                </div>
                <Filter onFilterChange={handleFilterChange} />
            </aside>
    
            {/* Right rail with pet grid */}
            <main className="w-3/4 p-4 overflow-y-auto h-full">
            <div className="flex items-center mb-6">
        <div className="flex-grow border-t border-blue-700"></div>
        <h1 className="text-center font-bold text-2xl mx-4 text-blue-700">Find Your New Best Friend</h1>
        <div className="flex-grow border-t border-blue-700"></div>
    </div>
                <Grid items={currentData} />
    
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
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
                            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Adopt;
