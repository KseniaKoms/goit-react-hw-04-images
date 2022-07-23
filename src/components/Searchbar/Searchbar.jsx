import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() !== '') {
      onSubmit(searchValue);
    } else {
      return toast.error('Incorrect search request');
    }
    setSearchValue('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchForm_button}>
          <span className={styles.searchForm_label}>Search</span>
        </button>

        <input
          name="searchValue"
          value={searchValue}
          className={styles.searchForm_input}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
