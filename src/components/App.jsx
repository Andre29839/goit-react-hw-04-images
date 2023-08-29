import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import * as API from '../service/galleryService';
import { toast } from 'react-toastify';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    page: 1,
    IsLoading: false,
    error: '',
    totalPages: 0,
    showModal: false,
    modalMenu: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  hendleSubmit = query => {
    this.setState({
      searchName: query,
      images: [],
      page: 1,
    });
  };

  handleOpenModal = modalMenu => {
    this.setState({ modalMenu, showModal: true });
  };

  fetchImages = async () => {
    const { page, searchName } = this.state;

    try {
      this.setState({ IsLoading: true });

      const data = await API.getImages(searchName, page);

      if (data.hits.length === 0) {
        return toast.info('Sorry not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      this.setState(state => ({
        images: [...state.images, ...API.normalizeImages(data.hits)],
        IsLoading: true,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ IsLoading: false });
    }
  };

  render() {
    const { images, page, IsLoading, totalPages, showModal, modalMenu } =
      this.state;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.hendleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} openModal={this.handleOpenModal} />
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
        {IsLoading && <Loader />}
        {images.length > 0 && totalPages !== page && !IsLoading && (
          <Button onClick={this.loadMore} />
        )}
        {showModal && <Modal image={modalMenu} closeModal={this.closeModal} />}
      </div>
    );
  }
}
