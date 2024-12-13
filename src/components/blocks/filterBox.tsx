import React, { useState, useEffect } from 'react';
import petData from '../../../data/pets.json';

import CheckboxGroup from './checkBoxGroup';
import Sort from './sortBox';
import { weightRanges, ageRanges } from 'utils/utils';

interface FilterProps {
    onFilterChange: (filters: Record<string, any>) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [sort, setSort] = useState<string | undefined>();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [selectedSexes, setSelectedSexes] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedGoodWithCats, setSelectedGoodWithCats] = useState<string[]>([]);
    const [selectedGoodWithDogs, setSelectedGoodWithDogs] = useState<string[]>([]);

    const filtersState = {
        sort,
        type: selectedTypes,
        age: selectedAges,
        breed: selectedBreeds,
        sex: selectedSexes,
        location: selectedLocations,
        weight: selectedWeights,
        color: selectedColors,
        personality: selectedPersonalities,
        status: selectedStatuses,
        goodWithCats: selectedGoodWithCats,
        goodWithDogs: selectedGoodWithDogs
    };

    const handleChange = (key: keyof typeof filtersState, value: string) => {
        const updateState = {
            sort: setSort,
            type: setSelectedTypes,
            age: setSelectedAges,
            breed: setSelectedBreeds,
            sex: setSelectedSexes,
            location: setSelectedLocations,
            weight: setSelectedWeights,
            color: setSelectedColors,
            personality: setSelectedPersonalities,
            status: setSelectedStatuses,
            goodWithCats: setSelectedGoodWithCats,
            goodWithDogs: setSelectedGoodWithDogs
        }[key];

        if (Array.isArray(filtersState[key])) {
            const updated = filtersState[key].includes(value)
                ? (filtersState[key] as string[]).filter((item) => item !== value)
                : [...(filtersState[key] as string[]), value];
            (updateState as React.Dispatch<React.SetStateAction<string[]>>)(updated);
        } else {
            (updateState as React.Dispatch<React.SetStateAction<string | undefined>>)(value);
        }

        onFilterChange({
            ...filtersState,
            [key]: Array.isArray(filtersState[key])
                ? filtersState[key].includes(value)
                    ? (filtersState[key] as string[]).filter((item) => item !== value)
                    : [...(filtersState[key] as string[]), value]
                : value
        });
    };

    const filteredData = selectedTypes.length ? petData.filter((pet) => selectedTypes.includes(pet.type)) : petData;
    const uniqueStatus = Array.from(new Set(filteredData.map((pet) => (pet.status && pet.status.trim() !== '' ? pet.status : 'unknown'))));
    const uniqueType = Array.from(new Set(petData.map((pet) => pet.type)));
    const uniqueSex = Array.from(new Set(petData.map((pet) => (pet.sex && pet.sex.trim() !== '' ? pet.sex : 'unknown'))));
    const uniqueBreeds = Array.from(new Set(filteredData.map((pet) => (pet.breed && pet.breed.trim() !== '' ? pet.breed : 'unknown'))));
    const uniqueWeights = [
        '1-10 lb',
        '11-20 lb',
        '21-45 lb',
        '46-70 lb',
        '70+ lb',
        ...(filteredData.some((pet) => !pet.weight || pet.weight.trim() === '') ? ['unknown'] : [])
    ].filter((range) => {
        return filteredData.some(
            (pet) =>
                range === 'unknown'
                    ? !pet.weight || pet.weight.trim() === '' // Include pets with unknown weight
                    : weightRanges[range]?.(parseFloat(pet.weight)) // Include pets within the weight range
        );
    });

    const uniqueAges = [
        '0-1 year',
        '1-3 years',
        '4-6 years',
        '7-10 years',
        '10+ years',
        ...(filteredData.some((pet) => !pet.dob || pet.dob.trim() === '') ? ['unknown'] : [])
    ];

    const uniqueColors = Array.from(new Set(filteredData.map((pet) => (pet.color && pet.color.trim() !== '' ? pet.color : 'unknown'))));
    const uniquePersonalities = Array.from(
        new Set([
            ...filteredData.flatMap((pet) => (pet.personality ? pet.personality.map((trait) => trait.toLowerCase()) : [])),
            ...(filteredData.some((pet) => !pet.personality || pet.personality.length === 0) ? ['unknown'] : [])
        ])
    );
    const uniqueLocations = Array.from(new Set(filteredData.map((pet) => (pet.location && pet.location.trim() !== '' ? pet.location : 'unknown'))));
    const uniqueGoodWithCats = Array.from(new Set(petData.map((pet) => (pet.goodWithCats && pet.goodWithCats.trim() !== '' ? pet.goodWithCats : 'unknown'))));
    const uniqueGoodWithDogs = Array.from(new Set(petData.map((pet) => (pet.goodWithDogs && pet.goodWithDogs.trim() !== '' ? pet.goodWithDogs : 'unknown'))));

    // Reset dependent filters when `type` changes
    useEffect(() => {
        setSelectedBreeds([]);
        setSelectedWeights([]);
        setSelectedColors([]);
        setSelectedPersonalities([]);
        setSelectedLocations([]);
    }, [selectedTypes]);

    // Function to clear all filters
    const clearFilters = () => {
        setSort(undefined);
        setSelectedAges([]);
        setSelectedTypes([]);
        setSelectedBreeds([]);
        setSelectedSexes([]);
        setSelectedLocations([]);
        setSelectedWeights([]);
        setSelectedColors([]);
        setSelectedPersonalities([]);
        setSelectedStatuses([]);
        setSelectedGoodWithCats([]);
        setSelectedGoodWithDogs([]);
        onFilterChange({
            sort: undefined,
            age: [],
            type: [],
            breed: [],
            sex: [],
            location: [],
            weight: [],
            color: [],
            personality: [],
            status: [],
            goodWithCats: [],
            goodWithDogs: []
        });
    };

    return (
        <div>
            {/* Header with Clear Filters Button && total result */}
            <div className="filter-header">
                <button onClick={clearFilters}>Clear Filters</button>
            </div>

            {/* Sort Filter */}
            <Sort
                label="Sort"
                options={[
                    { value: 'asc', label: 'Time in shelter: Low to High' },
                    { value: 'desc', label: 'Time in shelter: High to Low' }
                ]}
                selectedValue={sort}
                onChange={(value) => handleChange('sort', value)}
            />

            {/* Status Filter */}
            <CheckboxGroup
                label="Status"
                options={uniqueStatus}
                selectedOptions={selectedStatuses}
                onChange={(value) => handleChange('status', value)}
            />

            {/* Type Filter */}
            <CheckboxGroup
                label="Type"
                options={uniqueType}
                selectedOptions={selectedTypes}
                onChange={(value) => handleChange('type', value)}
            />

            {/* Sex Filter */}
            <CheckboxGroup label="Gender" 
            options={uniqueSex} 
            selectedOptions={selectedSexes} 
            onChange={(value) => handleChange('sex', value)} />

            {/* Age Filter */}
            <CheckboxGroup 
            label="Age" 
            options={uniqueAges} 
            selectedOptions={selectedAges} 
            onChange={(value) => handleChange('age', value)} />

            {/* Breed Filter */}
            <CheckboxGroup
                label="Breed"
                options={uniqueBreeds}
                selectedOptions={selectedBreeds}
                onChange={(value) => handleChange('breed', value)}
                isVisible={selectedTypes.length > 0}
            />

            {/* Weight Filter */}
            <CheckboxGroup
                label="Weight"
                options={uniqueWeights}
                selectedOptions={selectedWeights}
                onChange={(value) => handleChange('weight', value)}
                isVisible={selectedTypes.length > 0}
            />

            {/* Color Filter */}
            <CheckboxGroup
                label="Color"
                options={uniqueColors}
                selectedOptions={selectedColors}
                onChange={(value) => handleChange('color', value)}
                isVisible={selectedTypes.length > 0}
            />

            {/* Personality Filter */}
            <CheckboxGroup
                label="Personality"
                options={uniquePersonalities}
                selectedOptions={selectedPersonalities}
                onChange={(value) => handleChange('personality', value)}
                isVisible={selectedTypes.length > 0}
            />

            {/* Location Filter */}
            <CheckboxGroup
                label="Location"
                options={uniqueLocations}
                selectedOptions={selectedLocations}
                onChange={(value) => handleChange('location', value)}
            />

            {/* Good with Cats Filter */}
            <CheckboxGroup
                label="Good With Cats"
                options={uniqueGoodWithCats}
                    selectedOptions={selectedGoodWithCats} 
                    onChange={(value) => handleChange('goodWithCats', value)}
            />

            {/* Good with Dogs Filter */}
            <CheckboxGroup
                label="Good With Dogs"
                options={uniqueGoodWithDogs}
                    selectedOptions={selectedGoodWithDogs} 
                    onChange={(value) => handleChange('goodWithDogs', value)}
            />
        </div>
    );
};

export default Filter;
