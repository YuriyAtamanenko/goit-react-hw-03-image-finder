import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoSearchOutline } from 'react-icons/io5';

export default class Searchbar extends Component {
  state = { search: '' };

  handleFromSubmit = event => {
    event.preventDefault();
    const searchQuery = event.currentTarget.text.value.trim();

    if (searchQuery === '') {
      alert('Введіть назву в поле пошуку');
    } else this.props.onSubmit(searchQuery);
    this.reset();
  };

  handleChangeInput = event => {
    this.setState({
      search: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  reset = () => {
    this.setState({
      search: '',
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleFromSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">
              <IoSearchOutline className="Icon" />
            </span>
          </button>

          <input
            className="SearchForm-input"
            value={this.state.search}
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
