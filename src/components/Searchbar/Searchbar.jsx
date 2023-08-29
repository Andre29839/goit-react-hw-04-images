import css from './Searchbar.module.css';
import propTypes from 'prop-types';
import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const hendleChange = e => {
    setValue(e.target.value);
  };

  const hendleSubmit = e => {
    e.preventDefault();
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <header>
      <form className={css.form} onSubmit={hendleSubmit}>
        <button type="submit" className={css.button}>
          <FcSearch />
          <span className={css.button_label}>Search</span>
        </button>

        <input
          name="searchName"
          className={css.input}
          type="text"
          onChange={hendleChange}
          value={value}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
