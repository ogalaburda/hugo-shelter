import React from 'react';

interface CheckboxGroupProps {
    label: string; // Label for the group
    options: string[]; // Options for the checkboxes
    selectedOptions: string[]; // Selected options
    onChange: (value: string) => void; // Change handler
    isVisible?: boolean; // Conditional visibility (default: true)
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    label,
    options,
    selectedOptions,
    onChange,
    isVisible = true,
}) => {
    if (!isVisible) return null; // Don't render if not visible

    return (
        <div className="filter-container">
            <label className="filter-label">{label}</label>
            <div className="checkbox-group">
                {options.map((option) => (
                    <label key={option} className="checkbox-item">
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => onChange(option)}
                            className="checkbox-input"
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
