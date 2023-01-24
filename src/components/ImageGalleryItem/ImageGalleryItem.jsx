import PropTypes from 'prop-types';
import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ webformatURL, onOpenModal }) => {
  return (
    <>
      <ImageGalleryItemStyled>
        <ImageGalleryItemImage
          onClick={onOpenModal}
          src={webformatURL}
          alt={webformatURL}
        />
      </ImageGalleryItemStyled>
    </>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
