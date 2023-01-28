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
    images: [],
    page: 0,
    text: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.text !== this.state.text
    ) {
      this.setState({ status: 'pending' });
      fetchImages(this.state.text, this.state.page).then(({ data }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
        if (this.state.page > data.total / 12) {
          return this.setState({ status: 'rejected' });
        }
        this.setState({
          status: 'resolved',
        });
      });
    }
  }

  onSubmit = text => {
    this.setState(prevState => ({
      page: 1,
      text: text,
      images: [],
    }));
    window.scroll({ top: 0 });
  };

  onButtonHandleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  //РЕНДЕР ПО СТЕЙТ МАШИНІ
  render() {
    const { status, images } = this.state;
    const { onSubmit, onButtonHandleClick } = this;
    return (
      <AppBox>
        <SearchBar onSubmit={onSubmit} />;
        <ImageGallery images={images} />
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
