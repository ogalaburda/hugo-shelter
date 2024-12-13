import React from 'react';
import AddPetForm from 'components/forms/addPetForm';

const AddPetPage = () => {
    const handleAddPet = async (formData: FormData) => {
        try {
            const response = await fetch('/api/add-pet', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Pet added successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error adding pet:', errorData);
                alert('Failed to add pet.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred while adding the pet.');
        }
    };

    return (
        <div>
            <AddPetForm onSubmit={handleAddPet} />
        </div>
    );
};

export default AddPetPage;
