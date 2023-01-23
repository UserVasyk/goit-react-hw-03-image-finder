import { Component } from 'react';
import { AppBox } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import fetchImages from './fetchImages';

export class App extends Component {
  state = {
    massiveOfImages: [],
  };
  fetchImages = (text, page) => {
    fetchImages(text, page).then(({ data }) =>
      this.setState({ massiveOfImages: [...data.hits] })
    );
  };

  onSubmit = text => {
    this.fetchImages(text, 1);
  };
  onButtonHandleClick = () => {
    console.log('кликнули на load more');
  };
  render() {
    return (
      <AppBox>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.massiveOfImages} />
        <Loader />
        <Button onButtonHandleClick={this.onButtonHandleClick} />
      </AppBox>
    );
  }
}
