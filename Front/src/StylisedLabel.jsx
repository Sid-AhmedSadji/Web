import React from 'react';
import styles from './Css/StylisedLabel.module.css'

const SearchInput = ({ value, setValue }) => {
  return (
    <>
      <input
        type="text"
        className={styles.inputSearch}
        id="input-search"
        value={value}
        onChange={(e) => setValue(e.target.value)} // Utilise une fonction fléchée pour mettre à jour la valeur
      />
      <label className={styles.search} htmlFor="input-search"></label>
    </>
  );
};

export default SearchInput;
