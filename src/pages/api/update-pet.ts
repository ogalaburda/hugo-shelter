import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false // Disable Next.js body parser to handle files
    }
};

// Normalize fields: Convert single-item arrays to strings
const normalizeField = (value: string | string[]): string => {
    return Array.isArray(value) ? value[0] : value;
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        const form = formidable({
            keepExtensions: true,
            multiples: true
        });

        // Define fields and files
        const fields: Record<string, any> = {};
        const files: Record<string, any> = {};

        // Listen for fields
        form.on('field', (name, value) => {
            console.log(`Field received: ${name} = ${value}`);

            if (name === 'personality') {
                // Ensure `personality` is treated as an array
                if (!fields[name]) {
                    fields[name] = []; // Initialize as an empty array
                }
                fields[name].push(value); // Append the value to the array
            } else {
                fields[name] = value; // Handle other fields normally
            }
        });

        // Listen for files
        form.on('file', (name, file) => {
            console.log(`File received: ${name}`);
            if (!files[name]) files[name] = [];
            files[name].push(file);
        });

        // Listen for the end of parsing
        form.on('end', async () => {
            console.log('Form parsing completed.');
            console.log('Fields:', fields);
            console.log('Files:', files);

            try {
                const id = fields.id;
                if (!id || typeof id !== 'string') {
                    return res.status(400).json({ message: 'Pet ID is required for updating.' });
                }

                const petsFilePath = path.join(process.cwd(), 'data', 'pets.json');
                const petsData = fs.readFileSync(petsFilePath, 'utf-8');
                const pets = JSON.parse(petsData);

                const petIndex = pets.findIndex((pet) => pet.id === id);
                if (petIndex === -1) {
                    return res.status(404).json({ message: `Pet with ID ${id} not found.` });
                }

                const petFolder = path.join(process.cwd(), 'public/images', id);
                if (!fs.existsSync(petFolder)) {
                    fs.mkdirSync(petFolder, { recursive: true });
                }

                let updatedAdditionalImages = [...(pets[petIndex].additionalImages || [])];

                // Handle images update
                if (files.additionalImages && files.additionalImages.length > 0) {
                    const existingAdditionalImages = new Set(updatedAdditionalImages); // Use a Set for duplicate checks

                    const newAdditionalImages = files.additionalImages.map((file) => {
                        const additionalFilePath = path.join(petFolder, file.originalFilename || file.newFilename);
                        fs.renameSync(file.filepath, additionalFilePath);
                        return `/images/${id}/${path.basename(additionalFilePath)}`;
                    });

                    // Add new images if they're not already present
                    newAdditionalImages.forEach((newImage) => {
                        if (!existingAdditionalImages.has(newImage)) {
                            updatedAdditionalImages.push(newImage);
                        }
                    });
                }

                const normalizedFields = Object.entries(fields).reduce((acc, [key, value]) => {
                    if (key === 'personality') {
                        // Handle personality as an array
                        acc[key] = Array.isArray(value) ? value : [value];
                    } else {
                        acc[key] = Array.isArray(value) ? normalizeField(value) : value;
                    }
                    return acc;
                }, {});
                console.log('Normalized Fields:', normalizedFields);

                // Update the pet's data
                const updatedPet = {
                    ...pets[petIndex],
                    ...normalizedFields, // Update fields
                    additionalImages: updatedAdditionalImages
                };

                console.log('Updated Pet Before Save:', updatedPet);

                pets[petIndex] = updatedPet;
                fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2), 'utf-8');

                console.log('Updated pet:', updatedPet);
                res.status(200).json({ message: 'Pet updated successfully!', pet: updatedPet });
            } catch (error) {
                console.error('Error handling the pet update:', error);
                res.status(500).json({ message: 'Error handling pet update', error });
            }
        });

        // Parse the form (No callback here because we're using events)
        form.parse(req);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
