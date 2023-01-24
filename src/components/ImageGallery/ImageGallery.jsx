import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    isActive: false,
    image: '',
  };
  onOpenModal = image => {
    this.setState({ image: image });
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };
  render() {
    return (
      <ImageGalleryStyled>
        {this.props.images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            onOpenModal={() => this.onOpenModal(largeImageURL)}
            key={id}
            webformatURL={webformatURL}
          />
        ))}
        {this.state.isActive && (
          <Modal
            onOpenModal={this.onOpenModal}
            largeImageURL={this.state.image}
          />
        )}
      </ImageGalleryStyled>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func,
};
