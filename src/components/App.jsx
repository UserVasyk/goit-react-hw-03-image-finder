import { Component } from 'react';
import Notiflix from 'notiflix';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import fetchImages from './fetchImages';
import { AppBox } from './App.styled';

export class App extends Component {
  state = {
    massiveOfImages: [],
    page: 1,
    text: '',
    status: 'idle',
  };

  //HTTP ЗАПИТ ПО ПОШУКУ
  onSubmit = text => {
    this.setState({ status: 'pending' });
    window.scroll({ top: 0 });
    this.setState({ page: 2, text: text });
    fetchImages(text, 1)
      .then(({ data }) => {
        this.setState({ massiveOfImages: data.hits });

        if (data.total <= 12) {
          return Promise.reject(new Error());
        }
        Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
        this.setState({ status: 'resolved' });
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };
  //HTTP ЗАПИТ КАРТИНОК ПО КЛІКУ НА BUTTON
  onButtonHandleClick = () => {
    this.setState({ status: 'pending' });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    fetchImages(this.state.text, this.state.page)
      .then(({ data }) => {
        this.setState(prevState => ({
          massiveOfImages: [...prevState.massiveOfImages, ...data.hits],
        }));
        if (data.hits.length < 12) {
          return Promise.reject(new Error());
        }
        this.setState(prevState => ({
          status: 'resolved',
        }));
      })
      .catch(error => {
        this.setState({ status: 'rejected' });
      });
  };
  //РЕНДЕР ПО СТЕЙТ МАШИНІ
  render() {
    const { status } = this.state;
    return (
      <AppBox>
        <SearchBar onSubmit={this.onSubmit} />;
        <ImageGallery images={this.state.massiveOfImages} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <>
            <Button onButtonHandleClick={this.onButtonHandleClick} />
          </>
        )}
        {status === 'rejected' &&
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          )}
      </AppBox>
    );
  }
}
