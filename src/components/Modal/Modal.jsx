import css from './Modal.module.css';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal_root');

export const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal({ src: '', alt: '' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal({ src: '', alt: '' });
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img className={css.modal_img} src={image.src} alt={image.alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  image: propTypes.shape({
    alt: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
  }).isRequired,
  closeModal: propTypes.func.isRequired,
};
