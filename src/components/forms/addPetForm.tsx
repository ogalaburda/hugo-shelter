import React, { useState, useEffect } from 'react';
import { initialFormData } from 'utils/utils';
import MediaUploadBlock from 'components/blocks/MediaUploadBlock';

interface AddPetFormProps {
    initialData?: Partial<typeof initialFormData>;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel?: () => void;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ initialData = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<typeof initialFormData>({
        ...initialFormData,
        ...initialData
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData((prevFormData) => {
                const isDataEqual = Object.keys(initialData).every((key) => initialData[key] === prevFormData[key]);
                if (isDataEqual) return prevFormData; // Avoid unnecessary updates
                return {
                    ...initialFormData,
                    ...initialData,
                    additionalImages: [] // Reset additional images
                };
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setFormData((prevState) => {
            const updatedPersonality = checked
                ? [...prevState.personality, value] // Add value to array
                : prevState.personality.filter((option) => option !== value); // Remove value from array
            return { ...prevState, personality: updatedPersonality };
        });
    };

    const handleAdditionalImagesChange = (updatedMedia: (File | string)[]) => {
        setFormData((prevState) => ({
            ...prevState,
            additionalImages: updatedMedia
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
    
        if (!formData.id) {
            // Generate a new ID only for new pets
            formDataToSend.append('id', Date.now().toString());
        } else {
            formDataToSend.append('id', formData.id);
        }
    
        // Append other fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image' || key === 'additionalImages') return;
    
            if (key === 'personality' && Array.isArray(value)) {
                // Append each personality trait as a separate entry
                value.forEach((trait) => formDataToSend.append(key, trait));
            } else if (Array.isArray(value)) {
                value.forEach((val) => formDataToSend.append(key, val));
            } else {
                formDataToSend.append(key, value as string);
            }
        });

        // Append additional images
        if (formData.additionalImages.length > 0) {
            formData.additionalImages.forEach((file) => {
                if (file instanceof File) 
                    formDataToSend.append('additionalImages', file);
            });
        }

        // Append ID for updates
        if (formData.id) {
            formDataToSend.append('id', formData.id);
        }

        await onSubmit(formDataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">{initialData?.id ? 'Update Pet Information' : 'Add New Pet'}</h2>

            {/* OPTIONS */}

            <label htmlFor="name">Type*:</label>
            <select id="type" name="type" value={formData.type} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg p-2">
                <option value="">Select</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="other">Other</option>
            </select>
            <br />
            <br />

            <label htmlFor="name">Gender*:</label>
            <select id="sex" name="sex" value={formData.sex} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg p-2">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
            </select>
            <br />
            <br />

            <label htmlFor="name">Name*:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name*"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
            />
            <br />
            <br />

            <label htmlFor="dob">Date of Birth (DOB):</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" />
            <br />
            <br />

            <label htmlFor="dis">Date of Intake (DIS)*:</label>
            <input
                type="date"
                id="dis"
                name="dis"
                value={formData.dis}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
            />
            <br />
            <br />

            <label htmlFor="location">Location*:</label>
            <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
            />
            <br />
            <br />

            <label htmlFor="weight">Weight (rounded):</label>
            <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                step="1"
                className="w-full border border-gray-300 rounded-lg p-2"
            />
            <br />
            <br />

            <label htmlFor="color">Color:</label>
            <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
            />
            <br />
            <br />

            {/* Breed */}
            <div className="mb-4">
                <label htmlFor="breed" className="block text-gray-700 font-medium">
                    Breed
                </label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
            </div>
            <br />

            {/* Personality */}
            <label>Personality:</label>
            <div className="space-y-2">
                {['shy', 'sidekick', 'love bug', 'party animal', 'leader of the band'].map((trait) => (
                    <div key={trait} className="flex items-center">
                        <input
                            type="checkbox"
                            id={trait}
                            name="personality"
                            value={trait}
                            checked={formData.personality.includes(trait)}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor={trait}>{trait}</label>
                    </div>
                ))}
            </div>
            <br />

            <label htmlFor="medication">Medication:</label>
            <select
                id="medication"
                name="medication"
                value={formData.medication}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="no">Unknown</option>
            </select>
            <br />
            <br />

            <label htmlFor="goodWithCats">Good with Cats:</label>
            <select
                id="goodWithCats"
                name="goodWithCats"
                value={formData.goodWithCats}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="no">Unknown</option>
            </select>
            <br />
            <br />

            <label htmlFor="goodWithDogs">Good with Dogs:</label>
            <select
                id="goodWithDogs"
                name="goodWithDogs"
                value={formData.goodWithDogs}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="no">Unknown</option>
            </select>
            <br />
            <br />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
            <br />
            <br />

            <label htmlFor="history">History:</label>
            <textarea id="history" name="history" value={formData.history} onChange={handleInputChange}></textarea>
            <br />
            <br />

            {/* Additional Images/Videos */}
            <div className="mb-4">
                <label htmlFor="additionalImages" className="block text-gray-700 font-medium">
                    Additional Images/Videos (first image will be the main one):
                </label>
                <MediaUploadBlock
                    mediaFiles={formData.additionalImages}
                    onMediaChange={handleAdditionalImagesChange}
                    accept="image/*,video/*"
                />
            </div>

            {/* Submit and Cancel */}
            <div className="flex justify-end space-x-4">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Cancel
                    </button>
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {initialData?.id ? 'Update Pet' : 'Add Pet'}
                </button>
            </div>
        </form>
    );
};

export default AddPetForm;
