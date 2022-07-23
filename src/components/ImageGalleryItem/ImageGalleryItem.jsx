import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImage, src, alt, showModal }) => {
  return (
    <li
      className={styles.imageItem}
      onClick={() => {
        showModal(largeImage, alt);
      }}
    >
      <img src={src} alt={alt} className={styles.imageItem_image} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showModal: PropTypes.func.isRequired,
};
