import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {

    useEffect(() => {
        window.addEventListener('keydown', (e) => { 
            e.code === 'Escape' && onClose();
        });
    });

    const onBackdropClick = (e) => {
        e.currentTarget === e.target && onClose();
    }
    
    return (
        createPortal(<div className={s.overlay} onClick={onBackdropClick}>
            <div className={s.modal}>
                {children}
            </div>
        </div>, modalRoot)
        )
}

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired, 
};