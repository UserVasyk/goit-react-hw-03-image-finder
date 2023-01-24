import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

import {
  ImageGalleryItemImage,
  ImageGalleryItemStyled,
} from './ImageGalleryItem.styled';
export class ImageGalleryItem extends Component {
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
      <>
        {this.props.images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItemStyled key={id}>
            <ImageGalleryItemImage
              onClick={() => this.onOpenModal(largeImageURL)}
              src={webformatURL}
              alt={webformatURL}
            />
          </ImageGalleryItemStyled>
        ))}
        {this.state.isActive && (
          <Modal
            onOpenModal={this.onOpenModal}
            largeImageURL={this.state.image}
          />
        )}
      </>
    );
  }
}
