import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
export const SearchBar = () => {
  return (
    <Searchbar>
      <SearchForm>
        <SearchFormButton type="submit">
          <FaSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};
