import React from 'react';
import styles from "./model.module.css";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Prevent rendering if modal is not open

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
