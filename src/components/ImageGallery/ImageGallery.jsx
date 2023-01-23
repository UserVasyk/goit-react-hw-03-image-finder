import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryStyled>
      <ImageGalleryItem images={images} />
    </ImageGalleryStyled>
  );
};
