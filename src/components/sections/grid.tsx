import React from 'react';
import Link from 'next/link';
import { calculateAge } from '../../utils/ageCalculator';
import { calculateShelterTime } from '../../utils/timeInShelterCalculator';
import { GridProps } from 'utils/interface';
import MediaDisplayBlock from 'components/blocks/MediaDisplayBlock';

const Grid: React.FC<GridProps> = ({ items }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {items.map((item) => {
                const age = calculateAge(item.dob);
                const timeInShelter = calculateShelterTime(item.dis);

                // Use the first image from additionalImages if available
                const gridImage = item.additionalImages && item.additionalImages.length > 0
                    ? item.additionalImages[0]
                    : null; // Fallback to null if no images are available

                return (
                    <Link
                        key={item.id}
                        href={item.url || `/adopt/${item.id}`} // Use `url` if provided
                        className="block overflow-hidden cursor-pointer border rounded-lg p-2 shadow hover:shadow-md transition"
                    >
                        {/* Main Image Display */}
                        <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
                            <MediaDisplayBlock
                                url={gridImage}
                                altText={`Image of ${item.name}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-1 text-center">
                            <h2 className="text-lg font-bold text-center">{item.name}</h2>
                            <p className="text-center text-sm">Age: {age === 'unknown' ? 'unknown' : `${age} years`}</p>
                            <p className="text-center text-sm">Time In Shelter: {timeInShelter} years</p>
                            <p className="text-center text-sm">{item.location}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Grid;
