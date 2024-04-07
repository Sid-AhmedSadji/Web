import React from 'react';
import styles from './Css/StylisedLabel.module.css'

const SearchInput = ({ value, setValue }) => (
  <>
    <input
      type="text"
      className={styles.inputSearch}
      id="input-search"
      value={value}
      onChange={(e) => setValue(e.target.value)} // Use an arrow function to update the value
    />
    <label className={styles.search} htmlFor="input-search"></label>
  </>
);

export default SearchInput;

