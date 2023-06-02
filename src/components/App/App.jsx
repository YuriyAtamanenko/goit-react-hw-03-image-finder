import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import ImagesApiService from '../../services/API';

export default class App extends Component {
  state = {
    query: '',
    imgs: [],
    page: null,
    isLoadMoreBtn: false,
    isLoader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      ImagesApiService(this.state.query, this.state.page)
        .then(data =>
          data.hits.length < 12
            ? this.setState(PrevState => ({
                imgs: [...PrevState.imgs, ...data.hits],
                isLoader: false,
                isLoadMoreBtn: false,
              }))
            : this.setState(PrevState => ({
                imgs: [...PrevState.imgs, ...data.hits],
                isLoader: false,
                isLoadMoreBtn: true,
              }))
        )
        .catch(error => console.log(error));
    }
  }

  handleFromSubmit = query => {
    this.setState({
      query,
      imgs: [],
      page: 1,
      isLoader: true,
      isLoadMoreBtn: false,
    });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoader: true,
      isLoadMoreBtn: false,
    }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFromSubmit} />
        {this.state.query && <ImageGallery imgs={this.state.imgs} />}
        {this.state.isLoadMoreBtn && <Button onClick={this.handleLoadMore} />}
        {this.state.isLoader && <Loader />}
      </div>
    );
  }
}
