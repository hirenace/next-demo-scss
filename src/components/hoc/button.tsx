// CenteredButton.tsx
import React from 'react';

interface CenteredButtonProps {
    onClick?: () => void;
    className: string;
    type: "button" | "submit" | "reset" | undefined;
    buttonText: string;
}

const CenteredButton: React.FC<CenteredButtonProps> = ({ onClick, className, type, buttonText }) => {
    return (
        <div className={'centered-container'}>
            <button
                onClick={onClick}
                className={`${'centered-button'} ${className}`}
                type={type}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default CenteredButton;
