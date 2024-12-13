import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AddPetForm from 'components/forms/addPetForm';
import petData from '../../data/pets.json';
import { Pet } from 'utils/interface'; // Import the Pet interface

const UpdatePetPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pet, setPet] = useState<Pet | undefined>();

    useEffect(() => {
        // Find the pet data using the ID and set it
        if (id) {
            const foundPet = petData.find((p: Pet) => p.id === id);
            setPet(foundPet);
        }
    }, [id]);

    const handleUpdatePet = async (formData: FormData) => {
        try {
            const response = await fetch('/api/update-pet', {
                method: 'POST',
                body: formData, // Send the form data directly
            });

            if (response.ok) {
                alert('Pet updated successfully!');
                router.push(`/adopt/${id}`); // Redirect back to the pet profile
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert('Failed to update pet.');
            }
        } catch (error) {
            console.error('Error updating the pet:', error);
        }
    };

    if (!pet) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Update Pet</h1>
            <AddPetForm
                initialData={{
                    ...pet,
                    personality: Array.isArray(pet.personality) ? pet.personality : [],
                    additionalImages: Array.isArray(pet.additionalImages) ? pet.additionalImages : [],
                }}
                onSubmit={handleUpdatePet}
            />
        </div>
    );
};

export default UpdatePetPage;