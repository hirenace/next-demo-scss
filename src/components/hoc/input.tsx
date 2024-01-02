import React from 'react';

interface CenteredInputProps {
    type: string;
    placeholder: string;
    name?: string | any;
    value?: string | number;
    onChange: (value: any, name: string) => void;
    className: string;
    accept?: string
    multiple?: boolean
}

const CenteredInput: React.FC<CenteredInputProps> = (props) => {
    const { type, placeholder, name, value, onChange, className, accept } = props
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => onChange(e, name)}
            className={className}
            accept={accept}
            multiple
        />
    );
};

export default CenteredInput;
