import PropTypes from "prop-types";
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => { 
    return (
        <ul className={s.gallery}>
            {images.map((image, index) => {
                return <ImageGalleryItem key={index} image={image} onClick={onImageClick} />
            })}
    
        </ul>    
    )
}

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            webformatURL: PropTypes.string,
            tags: PropTypes.string,
            largeImageURL: PropTypes.string,
        })
    ).isRequired, 
    onImageClick: PropTypes.func.isRequired,
};