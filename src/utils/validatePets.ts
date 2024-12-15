import fs from 'fs';
import path from 'path';

const petsFilePath = path.join(process.cwd(), 'data', 'pets.json'); // Use process.cwd() to ensure correct path

try {
    // Read and parse the pets.json file
    const petsData = JSON.parse(fs.readFileSync(petsFilePath, 'utf-8')) as { id: string }[];

    // Extract IDs and find duplicates
    const ids = petsData.map((pet) => pet.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

    if (duplicates.length > 0) {
        console.error('Duplicate IDs found:', duplicates);
        process.exit(1); // Exit with an error code
    } else {
        console.log('No duplicate IDs found.');
    }
} catch (error) {
    console.error('Error validating pets.json:', error);
    process.exit(1); // Exit with an error code
}