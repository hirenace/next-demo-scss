import React from 'react';

interface CenteredInputProps {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (value: string, name: string) => void;
    className: string;
}

const CenteredInput: React.FC<CenteredInputProps> = ({ type, placeholder, name, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value, name)}
            className={className}
        />

    );
};

export default CenteredInput;
