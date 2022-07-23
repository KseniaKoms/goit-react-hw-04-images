import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, showModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(({ largeImageURL, tags, webformatURL, id }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImage={largeImageURL}
            alt={tags}
            src={webformatURL}
            showModal={showModal}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
export default ImageGallery;
