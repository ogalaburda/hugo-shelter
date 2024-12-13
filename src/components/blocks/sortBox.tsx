import React from 'react';

interface SelectProps {
    label: string; // The title of the dropdown
    options: { value: string; label: string }[]; // Options with value and label
    selectedValue: string | undefined; // The currently selected value
    onChange: (value: string) => void; // Function to handle changes
}

const Sort: React.FC<SelectProps> = ({ label, options, selectedValue, onChange }) => {
    return (
        <div className="filter-container">
            <label className="filter-label" htmlFor="sort-dropdown">
                {label}
            </label>
                <select id="sort-dropdown" value={selectedValue} onChange={(e) => onChange(e.target.value)} 
                className="select-item">
                    <option value="">Select</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
    );
};

export default Sort;
