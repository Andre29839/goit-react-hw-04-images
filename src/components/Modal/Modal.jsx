import { Component } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal_root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'visible';
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal({ src: '', alt: '' });
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal({ src: '', alt: '' });
    }
  };

  render() {
    const { image } = this.props;
    console.log(this.props);

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img className={css.modal_img} src={image.src} alt={image.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: propTypes.shape({
    alt: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
  }).isRequired,
  closeModal: propTypes.func.isRequired,
};
