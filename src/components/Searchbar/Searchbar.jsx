import { Component } from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

export class Searchbar extends Component {
  state = {
    search: '',
    value: '',
  };

  hendleChange = e => {
    this.setState({ value: e.target.value });
  };

  hendleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchName.value.trim();
    this.props.onSubmit(searchQuery);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header>
        <form className={css.form} onSubmit={this.hendleSubmit}>
          <button type="submit" className={css.button}>
            <FcSearch />
            <span className={css.button_label}>Search</span>
          </button>

          <input
            name="searchName"
            className={css.input}
            type="text"
            onChange={this.hendleChange}
            value={this.state.value}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
