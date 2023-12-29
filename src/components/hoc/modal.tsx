import React from 'react';
import CenteredButton from './button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    header?: React.ReactNode;
    children: React.ReactNode;
    onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, header, children, onSubmit }) => {
    return (
        <>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={onClose}>
                            &times;
                        </span>
                        {header && <div className="modal-header">{header}</div>}
                        <div className="modal-body">{children}</div>
                        <div className="modal-actions d-flex justify-content-center">
                            {onSubmit && (
                                <CenteredButton
                                    onClick={onSubmit}
                                    className={'centered-button submit-btn mr-2'}
                                    type={"submit"}
                                    buttonText={"Submit"}
                                />

                            )}

                            <CenteredButton
                                onClick={onClose}
                                className={'centered-button close-btn'}
                                type={"submit"}
                                buttonText={"Close"}
                            />

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
