import css from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

export const ImageGalleryItem = ({ image, openModal }) => {
  // render() {
  //   const { largeImageURL, tags, webformatURL } = this.props.image;
  //   const { openModal } = this.props;

  return (
    <li
      className={css.gallery_item}
      onClick={() => {
        openModal({ src: image.largeImageURL, alt: image.tags });
      }}
    >
      <img
        className={css.gallery_img}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};
// };

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    webformatURL: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }).isRequired,
};
