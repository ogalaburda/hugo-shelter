// import fs from 'fs';
// import path from 'path';
// import formidable from 'formidable'; // For handling file uploads

// export const config = {
//     api: {
//         bodyParser: false, // Disable Next.js body parser to handle files
//     },
// };

// // Normalize fields: Convert single-item arrays to strings, keep arrays for specific fields
// const normalizeField = (value: string | string[]): string => {
//     return Array.isArray(value) ? value[0] : value; // If array, take the first value
// };

// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         const form = formidable({
//             keepExtensions: true, // Preserve file extensions
//             multiples: true, // Allow multiple file uploads
//         });

//         form.parse(req, async (err, fields, files) => {
//             if (err) {
//                 console.error('Error parsing the form:', err);
//                 return res.status(500).json({ message: 'Error parsing form data' });
//             }

//             console.log('Raw Fields:', fields);
//             console.log('Files:', files);

//             try {
//                 const id = normalizeField(fields.id) || Date.now().toString(); // Generate pet ID if not provided
//                 const petFolder = path.join(process.cwd(), 'public/images', id);

//                 // Ensure folder exists
//                 if (!fs.existsSync(petFolder)) {
//                     fs.mkdirSync(petFolder, { recursive: true });
//                 }

//                 const uploadedFiles = [];
//                 const additionalImages = [];

//                 // Handle main image
//                 if (files.image) {
//                     const mainImage = Array.isArray(files.image) ? files.image[0] : files.image;
//                     const mainImagePath = path.join(petFolder, mainImage.originalFilename || mainImage.newFilename);
//                     fs.renameSync(mainImage.filepath, mainImagePath);
//                     uploadedFiles.push(`/images/${id}/${path.basename(mainImagePath)}`);
//                 }

//                 // Handle additional images/videos
//                 if (files.additionalImages) {
//                     const additionalFiles = Array.isArray(files.additionalImages)
//                         ? files.additionalImages
//                         : [files.additionalImages];

//                     for (const file of additionalFiles) {
//                         const additionalFilePath = path.join(
//                             petFolder,
//                             file.originalFilename || file.newFilename
//                         );
//                         fs.renameSync(file.filepath, additionalFilePath);
//                         additionalImages.push(`/images/${id}/${path.basename(additionalFilePath)}`);
//                     }
//                 }

//                 // Assuming fields is an object where values can be string or string[]
//                 const normalizedFields = Object.entries(fields as Record<string, string | string[]>).reduce(
//                     (acc, [key, value]) => {
//                         acc[key] =
//                             key === 'personality' || key === 'additionalImages'
//                                 ? value // Keep these as arrays
//                                 : normalizeField(value); // Normalize other fields to strings
//                         return acc;
//                     },
//                     {} as Record<string, string | string[]>
//                 );




//                 // Read and update pets.json
//                 const petsFilePath = path.join(process.cwd(), 'data', 'pets.json');
//                 const petsData = fs.readFileSync(petsFilePath, 'utf-8');
//                 const pets = JSON.parse(petsData);

//                 const newPet = {
//                     id,
//                     status: 'available',
//                     image: uploadedFiles[0] || '',
//                     additionalImages: additionalImages,
//                     ...normalizedFields, // Add normalized form fields
//                 };

//                 pets.push(newPet);
//                 fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2), 'utf-8');

//                 console.log('Uploaded files:', uploadedFiles);
//                 console.log('Additional files:', additionalImages);

//                 res.status(200).json({ message: 'Pet added successfully!', pet: newPet });
//             } catch (error) {
//                 console.error('Error handling the pet data:', error);
//                 res.status(500).json({ message: 'Error handling pet data', error });
//             }
//         });
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }

import fs from 'fs';
import path from 'path';
import formidable from 'formidable'; // For handling file uploads

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parser to handle files
    },
};

// Normalize fields: Convert single-item arrays to strings, keep arrays for specific fields
const normalizeField = (value: string | string[]): string => {
    return Array.isArray(value) ? value[0] : value; // If array, take the first value
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        const form = formidable({
            keepExtensions: true, // Preserve file extensions
            multiples: true, // Allow multiple file uploads
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing the form:', err);
                return res.status(500).json({ message: 'Error parsing form data' });
            }

            console.log('Raw Fields:', fields);
            console.log('Files:', files);

            try {
                const id = normalizeField(fields.id) || Date.now().toString(); // Generate pet ID if not provided
                const petFolder = path.join(process.cwd(), 'public/images', id);

                // Ensure folder exists
                if (!fs.existsSync(petFolder)) {
                    fs.mkdirSync(petFolder, { recursive: true });
                }

                const additionalImages = [];

                // Handle all uploaded images/videos under `additionalImages`
                const allFiles = Array.isArray(files.additionalImages)
                    ? files.additionalImages
                    : files.additionalImages
                    ? [files.additionalImages]
                    : []; // Ensure it's an array even if no files are uploaded

                for (const file of allFiles) {
                    const filePath = path.join(petFolder, file.originalFilename || file.newFilename);
                    fs.renameSync(file.filepath, filePath);
                    additionalImages.push(`/images/${id}/${path.basename(filePath)}`);
                }

                // Normalize other fields
                const normalizedFields = Object.entries(fields as Record<string, string | string[]>).reduce(
                    (acc, [key, value]) => {
                        acc[key] =
                            key === 'personality' || key === 'additionalImages'
                                ? value // Keep these as arrays
                                : normalizeField(value); // Normalize other fields to strings
                        return acc;
                    },
                    {} as Record<string, string | string[]>
                );

                // Read and update pets.json
                const petsFilePath = path.join(process.cwd(), 'data', 'pets.json');
                const petsData = fs.existsSync(petsFilePath) ? fs.readFileSync(petsFilePath, 'utf-8') : '[]';
                const pets = JSON.parse(petsData);

                const newPet = {
                    id,
                    status: 'available',
                    additionalImages, // Store all images here
                    ...normalizedFields, // Add normalized form fields
                };

                pets.push(newPet);
                fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2), 'utf-8');

                console.log('All uploaded files:', additionalImages);

                res.status(200).json({ message: 'Pet added successfully!', pet: newPet });
            } catch (error) {
                console.error('Error handling the pet data:', error);
                res.status(500).json({ message: 'Error handling pet data', error });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

