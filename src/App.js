import React from 'react';
import './App.css';
import fetchImages from './services/pixabay-api';

import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import Loader from './components/Loader';

class App extends React.Component {
  state = {
    query: '',
    images: [],
    loading: false,
    page: 1,
    totalHits: 0,
    fullImage: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ loading: true });
      fetchImages(query, page)
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            totalHits: data.totalHits,
            page: page + 1,
          })),
        )
        .finally(() => this.setState({ loading: false }));
    }
  }

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, loading: true }));
    fetchImages(this.state.query, this.state.page)
      .then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalHits: prevState.totalHits - 12,
        })),
      )
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal, fullImage: null });
  };

  onSubmitQuery = query => {
    this.setState({ query, images: [], totalHits: 0, page: 1 });
  };

  onImageClick = (src, alt) => {
    this.setState({ loading: true, fullImage: { src, alt } });
  };

  onLoadFullScreenImage = () => {
    this.setState({ loading: false });
  };

  render() {
    const { images, loading, totalHits, fullImage, query } = this.state;

    return (
      <div className="app-content">
        {loading && <Loader />}

        <SearchBar onSubmit={this.onSubmitQuery} />

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}

        {!loading && query.length > 0 && totalHits === 0 && (
          <p className="text-c">Photos with query {query} not found</p>
        )}

        {totalHits > 12 && <Button onClick={this.onLoadMoreClick} />}

        {fullImage && (
          <Modal onClose={this.toggleModal}>
            <img
              src={fullImage.src}
              alt={fullImage.alt}
              onLoad={this.onLoadFullScreenImage}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
