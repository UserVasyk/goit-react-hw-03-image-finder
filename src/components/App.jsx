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
    loading: false,
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.text !== this.state.text
    ) {
      this.setState({ loading: true, showBtn: false });
      fetchImages(this.state.text, this.state.page)
        .then(({ data }) => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            loading: false,
          }));
          if (this.state.page > data.total / 12) {
            Notiflix.Notify.warning(
              "We're sorry, but you've reached the end of search results."
            );
            return this.setState({ showBtn: false });
          }
          this.setState({
            showBtn: true,
          });
        })
        .catch(error => console.error(error));
    }
  }

  onSubmit = text => {
    this.setState({
      page: 1,
      text: text,
      images: [],
    });
    window.scroll({ top: 0 });
  };

  onButtonHandleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { images, showBtn, loading } = this.state;
    const { onSubmit, onButtonHandleClick } = this;
    return (
      <AppBox>
        <SearchBar onSubmit={onSubmit} />;
        <ImageGallery images={images} />
        {loading && <Loader />}
        {showBtn && <Button onButtonHandleClick={onButtonHandleClick} />}
      </AppBox>
    );
  }
}
