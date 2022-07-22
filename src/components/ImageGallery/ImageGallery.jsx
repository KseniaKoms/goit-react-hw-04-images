import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { fetchImages } from '../services/image-api';
import { toast } from 'react-toastify';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    totalPages: 1,
    error: null,
    largeImg: '',
    showModal: false,
    tags: '',
    status: 'idle',
    totalHits: null,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    try {
      if (
        prevProps.searchValue !== this.props.searchValue ||
        prevProps.page !== this.props.page
      ) {
        this.setState({ status: 'pending' });
        const response = await fetchImages(
          this.props.searchValue,
          this.props.page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          status: 'resolved',
          totalHits: response.data.totalHits,
          totalPages: Math.ceil(response.data.totalHits / 12),
        }));

        if (prevProps.searchValue !== this.props.searchValue) {
          this.setState({
            images: [...response.data.hits],
            totalHits: response.data.totalHits,
          });
        }
        if (!response.data.hits.length) {
          this.setState({
            status: 'idle',
          });
          toast.error(`${this.props.searchValue} was not found`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleOpenModal = (largeImg, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg: largeImg,
      tags: alt,
    }));
  };
  render() {
    const { images, status, tags, showModal, largeImg, totalPages } =
      this.state;
    return (
      <>
        {images.length > 0 && (
          <ul className={styles.imageGallery}>
            <ImageGalleryItem
              images={images}
              showModal={this.handleOpenModal}
            />
          </ul>
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && totalPages !== this.props.page && (
          <Button showMore={this.props.showMore} />
        )}
        {showModal && (
          <Modal
            alt={tags}
            largeImg={largeImg}
            showModal={this.handleOpenModal}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
