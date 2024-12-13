import React, { useState } from 'react';

export interface MediaUploadProps {
    mediaFiles: (string | File)[]; // Array of media URLs (string) or File objects
    onMediaChange: (updatedMedia: (string | File)[]) => void; // Callback for updating parent component state
    accept?: string; // File types to accept (e.g., "image/*,video/*")
}

const MediaUploadBlock: React.FC<MediaUploadProps> = ({ 
    mediaFiles = [], 
    onMediaChange, 
    accept = ''
}) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>(
        mediaFiles.map((media) => (typeof media === 'string' ? media : URL.createObjectURL(media)))
    );

    // Helper to check if the file is a video
    const isVideo = (url: string): boolean => {
        const videoExtensions = ['mp4', 'mov', 'webm'];
        const extension = url.split('.').pop()?.toLowerCase();
        return videoExtensions.includes(extension || '');
    };

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const filePreviews = files.map((file) => URL.createObjectURL(file));

        // Update previews and parent component state
        const updatedPreviews = [...previewUrls, ...filePreviews];
        setPreviewUrls(updatedPreviews);

        const updatedMedia = [...mediaFiles, ...files];
        onMediaChange(updatedMedia);
    };

    // Remove media
    const handleRemoveMedia = (index: number) => {
        const updatedPreviews = previewUrls.filter((_, i) => i !== index);
        setPreviewUrls(updatedPreviews);

        const updatedMedia = mediaFiles.filter((_, i) => i !== index);
        onMediaChange(updatedMedia);
    };

    return (
        <div className="space-y-4">
            {/* Upload Input */}
            <div>
                <label className="block text-gray-700 font-medium">Upload Media:</label>
                <input
                    type="file"
                    accept={accept} // Accept types specified via props
                    multiple // Allow multiple uploads if not singleUpload
                    onChange={handleFileUpload}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Media Previews */}
            <div className="flex flex-wrap gap-4">
                {previewUrls.map((media, index) => (
                    <div key={index} className="w-32 h-32 rounded-md shadow relative overflow-hidden">
                        {/* Display Video or Image */}
                        {isVideo(media) ? (
                            <video controls className="w-full h-full object-cover">
                                <source src={media} />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={media} alt={`media-${index}`} className="w-full h-full object-cover" />
                        )}

                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemoveMedia(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaUploadBlock;
