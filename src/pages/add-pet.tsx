import React from 'react';
import AddPetForm from 'components/forms/addPetForm';

const AddPetPage = () => {
    const handleAddPet = async (formData: FormData): Promise<{ message: string }> => {
        try {
            const response = await fetch('/api/add-pet', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json(); // Parse the response to get the message
                return { message: responseData.message || 'Pet added successfully!' };
            } else {
                const errorData = await response.json();
                return { message: errorData.message || 'Failed to add pet.' };
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            return { message: 'An error occurred while adding the pet.' };
        }
    };

    return (
        <div>
            <AddPetForm onSubmit={handleAddPet} />
        </div>
    );
};

export default AddPetPage;