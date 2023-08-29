import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import * as API from '../service/galleryService';
import { toast } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { useEffect, useState } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);

  useEffect(() => {
    if (!searchName) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const data = await API.getImages(searchName, page);

        if (data.hits.length === 0) {
          return toast.info('Sorry not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setImages(prevState => [
          ...prevState,
          ...API.normalizeImages(data.hits),
        ]);
        setIsLoading(true);
        setError('');
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, searchName]);

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const hendleSubmit = query => {
    setSearchName(query);
    setPage(1);
    setImages([]);
  };

  const handleOpenModal = image => {
    setModalMenu(image);
    setShowModal(true);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={hendleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} openModal={handleOpenModal} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== page && !isLoading && (
        <Button onClick={loadMore} />
      )}
      {showModal && <Modal image={modalMenu} closeModal={closeModal} />}
      {error && <p>{error}</p>}
    </div>
  );
};
