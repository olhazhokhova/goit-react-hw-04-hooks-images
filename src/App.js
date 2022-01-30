import { useState, useEffect } from 'react';
import './App.css';
import fetchImages from './services/pixabay-api';

import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import Loader from './components/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [fullImageSrc, setFullImageSrc] = useState(null);
  const [fullImageAlt, setFullImageAlt] = useState('image no name');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      fetchImages(query, page)
        .then(data => {
          setImages(prevImages => [...prevImages, ...data.hits]);
          if (page === 1) {
            setTotalHits(data.totalHits);
          } else {
            setTotalHits(prevHits => prevHits - 12);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [query, page]);

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setFullImageSrc(null);
    fullImageAlt && setFullImageAlt('image no name');
    showModal && setShowModal(false);
  };

  const onSubmitQuery = query => {
    setQuery(query);
    setImages([]);
    setTotalHits(0);
    setPage(1);
  };

  const onImageClick = (src, alt) => {
    setLoading(true);
    setFullImageSrc(src);
    setFullImageAlt(alt);
  };

  return (
    <div className="app-content">
      {loading && <Loader />}

      <SearchBar onSubmit={onSubmitQuery} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}

      {!loading && query.length > 0 && totalHits <= 0 && (
        <p className="text-c">Photos with query {query} not found</p>
      )}

      {totalHits > 12 && <Button onClick={onLoadMoreClick} />}

      {fullImageSrc && (
        <Modal onClose={toggleModal}>
          <img
            src={fullImageSrc}
            alt={fullImageAlt}
            onLoad={() => {
              setLoading(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
