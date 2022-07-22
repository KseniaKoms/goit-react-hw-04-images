import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ showMore }) => {
  return (
    <button type="button" className={styles.button} onClick={showMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  showMore: PropTypes.func.isRequired,
};
