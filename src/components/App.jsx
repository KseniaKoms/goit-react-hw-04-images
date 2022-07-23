import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { fetchImages } from './services/image-api';
import { toast } from 'react-toastify';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [largeImg, setLargeImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const searchImages = async () => {
      try {
        setStatus('pending');
        const response = await fetchImages(searchValue, page);
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setTotalPages(Math.ceil(response.data.totalHits / 12));
        setStatus('resolved');
        if (!response.data.hits.length) {
          setStatus('idle');
          toast.error(`${searchValue} was not found`);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    searchImages();
  }, [page, searchValue]);

  const handleSubmit = data => {
    if (searchValue === data) {
      return;
    }
    setSearchValue(data);
    setPage(1);
    setImages([]);
  };

  const handleOpenModal = (largeImg, alt) => {
    setShowModal(!showModal);
    setLargeImg(largeImg);
    setTags(alt);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} showModal={handleOpenModal} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && totalPages !== page && (
        <Button
          showMore={() => {
            setPage(page => page + 1);
          }}
        />
      )}
      {showModal && (
        <Modal alt={tags} largeImg={largeImg} showModal={handleOpenModal} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
