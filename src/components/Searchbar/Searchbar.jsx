import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export class SearchBar extends Component {
  state = {
    text: '',
  };
  onSubmit = evt => {
    evt.preventDefault();
    const { text } = this.state;
    this.props.onSubmit(text);
    this.setState({
      text: '',
    });
    evt.target.reset();
  };
  onChangeInput = evt => {
    this.setState({ text: evt.target.value });
  };
  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <FaSearch />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
