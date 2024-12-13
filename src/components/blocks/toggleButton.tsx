import React from 'react';

interface ToggleButtonProps {
    isAvailable: boolean;
    onToggle: (newState: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isAvailable, onToggle }) => {
    return (
        <button
            className={`px-4 py-2 rounded ${
                isAvailable ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
            onClick={() => onToggle(!isAvailable)}
        >
            {isAvailable ? 'Available' : 'Adopted'}
        </button>
    );
};

export default ToggleButton;
