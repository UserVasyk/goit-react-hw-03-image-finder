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
    page: 0,
    text: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      fetchImages(this.state.text, this.state.page)
        .then(({ data }) => {
          this.setState(prevState => ({
            massiveOfImages: [...prevState.massiveOfImages, ...data.hits],
          }));
          if (data.hits.length < 12) {
            return Promise.reject(new Error());
          }
          this.setState({
            status: 'resolved',
          });
        })
        .catch(error => {
          this.setState({ status: 'rejected' });
        });
    }
  }
  onSubmit = text => {
    this.setState({
      page: 1,
      text: text,
      massiveOfImages: [],
    });
    window.scroll({ top: 0 });
  };

  onButtonHandleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  //РЕНДЕР ПО СТЕЙТ МАШИНІ
  render() {
    const { status, massiveOfImages } = this.state;
    const { onSubmit, onButtonHandleClick } = this;
    return (
      <AppBox>
        <SearchBar onSubmit={onSubmit} />;
        <ImageGallery images={massiveOfImages} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <>
            <Button onButtonHandleClick={onButtonHandleClick} />
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
