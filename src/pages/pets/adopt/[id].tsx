import { useRouter } from 'next/router';
import petData from '../../../../data/pets.json';
import { useState } from 'react';
import Button from '../../../components/blocks/button';
import { calculateAge } from '../../../utils/ageCalculator';
import { Pet } from 'utils/interface'; // Importing the Pet interface
import ZoomSlider from 'components/sections/slider';
import { getPetDetails } from 'utils/utils';
import ToggleButton from 'components/blocks/toggleButton';
import { MediaDisplayProps } from 'components/blocks/MediaDisplayBlock';
import shelters from 'components/sections/shelterInformation';
import ShareButton from 'components/blocks/shareButton';
import { useFavorites } from 'context/favoritesContext';

const PetProfile = () => {
    const router = useRouter();
    const { id } = router.query;

    // Find the pet data using the ID
    const pet: Pet | undefined = petData.find((p: Pet) => p.id === id);

    const [currentTab, setCurrentTab] = useState('description');
    const [isAvailable, setIsAvailable] = useState(pet?.status === 'available' || false);

    // Handle case where pet is not found
    if (!pet) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Pet Not Found</h1>
                <p>We couldn’t find the pet you’re looking for.</p>
            </div>
        );
    }

    // Dynamically render shelter information based on pet location
    const shelterInfo = shelters[pet.location];

    // Prepare media items for the slider
    const mediaItems: MediaDisplayProps[] = pet.additionalImages.map((url) => ({
        url,
        type: url.endsWith('.mp4') ? 'video' : 'image',
        altText: `${pet.name} media`,
    }));

    const age = calculateAge(pet.dob); // Calculate age dynamically
    const petDetails = getPetDetails(pet, age);

    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleFavoriteClick = () => {
        if (isFavorite(pet.id)) {
            removeFavorite(pet.id);
        } else {
            addFavorite({ id: pet.id, name: pet.name, ...pet }); // Add the full pet object
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Container */}
                <div className="space-y-1">
                    {/* Name and Availability */}
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold">{pet.name}</h1>
                        <ToggleButton
                            isAvailable={isAvailable}
                            onToggle={(newState) => {
                                setIsAvailable(newState);
                                console.log('Availability toggled:', newState);
                            }}
                        />
                    </div>

                    {/* Pet ID and Update Button */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-normal">ID: {pet.id}</h2>
                        <Button
                            label="Update"
                            variant="primary"
                            onClick={() => router.push(`/update-pet?id=${pet.id}`)} // Redirect to update-pet page
                        />
                    </div>
                    {/* Main Image + Slider */}
                    {mediaItems.length > 0 ? <ZoomSlider mediaItems={mediaItems} /> :
                        <p>No media available for this pet.</p>}
                </div>

                {/* Right Container */}
                <div className="space-y-4">
                    <div className="flex justify-end space-x-4">
                        <Button
                            label={isFavorite(pet.id) ? 'Remove from Favorites' : 'Favorite'}
                            variant="secondary"
                            onClick={handleFavoriteClick}
                        />
                        <ShareButton
                            url={window.location.href} // Current page URL
                            text="Check out this amazing pet!" // Custom text for sharing
                        />
                    </div>

                    <ul className="space-y-2">
                        {petDetails.map((detail, index) => (
                            <li key={index}>
                                <strong>{detail.label}:</strong> {detail.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Tab Section */}
            <div>
                <div className="flex border-b mb-4">
                    <button
                        className={`px-4 py-2 ${currentTab === 'description' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setCurrentTab('description')}
                    >
                        Description
                    </button>
                    <button className={`px-4 py-2 ${currentTab === 'history' ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setCurrentTab('history')}>
                        History
                    </button>
                    <button
                        className={`px-4 py-2 ${currentTab === 'location' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setCurrentTab('location')}
                    >
                        Shelter Information
                    </button>
                </div>
                {/* Tab Content */}
                {currentTab === 'description' && <p>{pet.description || 'No description available.'}</p>}
                {currentTab === 'history' && <p>{pet.history || 'No history available.'}</p>}
                {currentTab === 'location' && (
                    <div>
                        {shelterInfo ? (
                            <div>
                                <h2 className="text-lg font-bold">{shelterInfo.name}</h2>
                                {shelterInfo.address && <p>Address: {shelterInfo.address}</p>}
                                {shelterInfo.phone && <p>Phone: {shelterInfo.phone}</p>}
                                {shelterInfo.email && <p>Email: {shelterInfo.email}</p>}
                                {shelterInfo.openingHours && <p>Opening Hours: {shelterInfo.openingHours}</p>}
                                {shelterInfo.coordinator && <p>Coordinator: {shelterInfo.coordinator}</p>}
                                {shelterInfo.details && <p>Details: {shelterInfo.details}</p>}
                            </div>
                        ) : (
                            <p>No shelter information available.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-between">
                <Button label="Donate" variant="primary" onClick={() => console.log('Donate button clicked')} />
                <div className="space-x-4">
                    {/* Foster Button */}
                    {pet.type === 'dog' && (
                        <Button
                            label="Foster"
                            variant="success"
                            disabled={!isAvailable}
                            onClick={() => console.log('Foster button clicked')}
                        />
                    )}
                    <Button
                        label="Adopt"
                        variant="success"
                        disabled={!isAvailable}
                        onClick={() => console.log('Adopt button clicked')}
                    />
                </div>
            </div>
        </div>
    );
};

export default PetProfile;