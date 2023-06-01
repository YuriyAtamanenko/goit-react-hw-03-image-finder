import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import ImagesApiService from '../../services/API';
const imagesApiService = new ImagesApiService();

export default class App extends Component {
  state = {
    query: '',
    imgs: [],
    isLoadMore: false,
    isLoader: false,
  };

  handleFromSubmit = query => {
    imagesApiService.resetPage();
    this.setState({ isLoader: true, isLoadMore: false });

    imagesApiService
      .getImages(query)
      .then(data =>
        data.hits.length < 12
          ? this.setState({
              query,
              imgs: data.hits,
              isLoader: false,
              isLoadMore: false,
            })
          : this.setState({
              query,
              imgs: data.hits,
              isLoader: false,
              isLoadMore: true,
            })
      )
      .catch(error => console.log(error));
  };

  handleLoadMore = () => {
    this.setState({ isLoader: true, isLoadMore: false });
    imagesApiService
      .getImages(this.state.query)
      .then(data =>
        data.hits.length < 12
          ? this.setState(PrevState => ({
              imgs: [...PrevState.imgs, ...data.hits],
              isLoader: false,
              isLoadMore: false,
            }))
          : this.setState(PrevState => ({
              imgs: [...PrevState.imgs, ...data.hits],
              isLoader: false,
              isLoadMore: true,
            }))
      )
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFromSubmit} />
        {this.state.query && <ImageGallery imgs={this.state.imgs} />}
        {this.state.isLoadMore && <Button onClick={this.handleLoadMore} />}
        {this.state.isLoader && <Loader />}
      </div>
    );
  }
}
