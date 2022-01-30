import PropTypes from "prop-types";
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image: {id, webformatURL, largeImageURL, tags}, onClick }) => {     
    return (
        <li id={id} className={s.galleryItem} onClick={() => {onClick(largeImageURL, tags)}}>
            <img src={webformatURL} alt={tags} loading="lazy" />
        </li>
    )
    
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string,
    }), 
};