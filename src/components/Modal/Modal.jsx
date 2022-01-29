import React from 'react';
import PropTypes from "prop-types";
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyEscapePressed);
    }

    onKeyEscapePressed = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    onBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }
    
    render() {
        return (
            createPortal(<div className={s.overlay} onClick={this.onBackdropClick}>
                <div className={s.modal}>
                    {this.props.children}
                </div>
            </div>, modalRoot)
            )
    }
}

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired, 
};