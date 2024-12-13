import React from 'react';

export interface MediaDisplayProps {
    url: string; // Required for media
    altText?: string; // Optional for images
    className?: string; // Custom classes for styling
    type?: 'image' | 'video'; // Enforces explicit media type
    videoControls?: boolean; // Optional video controls
}

const MediaDisplayBlock: React.FC<MediaDisplayProps> = ({
    url,
    altText = 'Media content',
    className = '',
    type = 'image', // Default type is 'image'
    videoControls = true, // Default to showing video controls
}) => {
    // Ensure URL is provided
    if (!url) return null;

    // Render Video
    if (type === 'video') {
        return (
            <video
                src={url}
                className={`object-cover ${className}`}
                controls={videoControls}
                autoPlay
                loop
                muted
            >
                Your browser does not support the video tag.
            </video>
        );
    }

    // Render Image
    return <img src={url} alt={altText} className={`object-cover ${className}`} />;
};

export default MediaDisplayBlock;