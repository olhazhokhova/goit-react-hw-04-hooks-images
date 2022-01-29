import React from 'react';
import PropTypes from "prop-types";
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component { 
    handleClick = () => {
        const { largeImageURL, tags } = this.props.image;
        this.props.onClick(largeImageURL, tags);
    }

    render() {
        
        const { image: { id, webformatURL, tags } } = this.props;
    
        return (
            <li id={id} className={s.galleryItem} onClick={this.handleClick}>
                <img src={webformatURL} alt={tags} loading="lazy" />
            </li>
        )
     }
    
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