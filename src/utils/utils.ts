import { Pet } from 'utils/interface';
import { calculateAge } from './ageCalculator';

export const weightRanges: { [key: string]: (weight: number) => boolean } = {
    '1-10 lb': (weight) => weight > 0 && weight <= 9.9,
    '11-20 lb': (weight) => weight >= 10 && weight <= 19.9,
    '21-45 lb': (weight) => weight >= 20 && weight <= 44.9,
    '46-70 lb': (weight) => weight >= 45 && weight <= 69.9,
    '70+ lb': (weight) => weight >= 70
};

export const ageRanges: { [key: string]: (age: number) => boolean } = {
    '0-1 year': (age) => age < 1,
    '1-3 years': (age) => age >= 1 && age <= 3.9,
    '4-6 years': (age) => age >= 4 && age <= 6.9,
    '7-10 years': (age) => age >= 7 && age <= 9.9,
    '10+ years': (age) => age > 10
};

// addPetForm.tsx
export const initialFormData = {
    id: '' as string,
    type: '' as string,              
    breed: '' as string,             
    sex: '' as string,               
    name: '' as string,              
    dob: '' as string,               
    dis: '' as string,               
    location: '' as string,          
    weight: '' as string,            
    color: '' as string,             
    medication: '' as string,        
    personality: [] as string[],     
    goodWithCats: '' as string,      
    goodWithDogs: '' as string,      
    // image: null as File | string | null,  
    status: '' as string,            
    additionalImages: [] as (File | string)[], 
    description: '' as string,       
    history: '' as string            
};

// Pet Details in Pet profile page
export const getPetDetails = (pet: Pet, age: number | "unknown"): { label: string; value: string }[] => {
    return [
        { label: 'Age', value: `${age} years` },
        { label: 'Type', value: pet.type },
        { label: 'Time In Shelter', value: `${calculateAge(pet.dis)} years` },
        { label: 'Gender', value: pet.sex || 'Unknown' },
        { label: 'Color', value: pet.color || 'Unknown' },
        { label: 'Weight', value: pet.weight ? `${pet.weight} lb` : 'Unknown' },
        { label: 'Breed', value: pet.breed || 'Unknown' },
        { label: 'Personality', value: Array.isArray(pet.personality) && pet.personality.length > 0 ? pet.personality.join(', ') : 'Unknown' },
        { label: 'Medication', value: pet.medication === 'yes' ? 'Yes' : pet.medication === 'no' ? 'No' : 'Unknown' },
        { label: 'Good with other cats', value: pet.goodWithCats === 'yes' ? 'Yes' : pet.goodWithCats === 'no' ? 'No' : 'Unknown' },
        { label: 'Good with dogs', value: pet.goodWithDogs === 'yes' ? 'Yes' : pet.goodWithDogs === 'no' ? 'No' : 'Unknown' },
        { label: 'Location', value: pet.location || 'Unknown' },
    ];
};
