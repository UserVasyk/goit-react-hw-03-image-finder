import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
export class App extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <Loader />
      </>
    );
  }
}
