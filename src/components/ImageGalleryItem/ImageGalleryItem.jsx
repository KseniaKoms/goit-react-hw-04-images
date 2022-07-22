import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, showModal }) => {
  return images.map(image => {
    return (
      <li
        className={styles.imageItem}
        key={image.id}
        onClick={() => {
          showModal(image.largeImageURL, image.tags);
        }}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={styles.imageItem_image}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showModal: PropTypes.func.isRequired,
};
