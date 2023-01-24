import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  onKeyDown = evt => {
    if (evt.key === 'Escape') {
      this.props.onOpenModal();
    }
  };
  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onOpenModal();
    }
  };
  render() {
    const { largeImageURL } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalBox>
          <img width={900} src={largeImageURL} alt={largeImageURL} />
        </ModalBox>
      </Overlay>
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
