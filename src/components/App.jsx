import { Component } from 'react';
import { AppBox } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
export class App extends Component {
  render() {
    return (
      <AppBox>
        <SearchBar />
        <Loader />
        <Button />
      </AppBox>
    );
  }
}
