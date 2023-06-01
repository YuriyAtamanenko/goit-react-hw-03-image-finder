import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpan: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpan }) => ({ isModalOpan: !isModalOpan }));
  };

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.webURL}
          alt={this.props.tags}
          className="ImageGalleryItem-image"
          onClick={this.toggleModal}
        />

        {this.state.isModalOpan && (
          <Modal
            onCloseModal={this.toggleModal}
            largeImageURL={this.props.largeImageURL}
            tags={this.props.tags}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
