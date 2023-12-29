import React from 'react';

interface CenteredInputProps {
    type: string;
    placeholder: string;
    name?: string;
    value?: string | number;
    onChange: (value: any, name: string) => void;
    className: string;
}

const CenteredInput: React.FC<CenteredInputProps> = ({ type, placeholder, name, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => onChange(e, name)}
            className={className}
        />

    );
};

export default CenteredInput;
