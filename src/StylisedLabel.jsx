import React from 'react';

const SearchInput = ({ value, setValue }) => {
  return (
    <>
      <input
        type="text"
        className="input-search"
        id="input-search"
        value={value}
        onChange={(e) => setValue(e.target.value)} // Utilise une fonction fléchée pour mettre à jour la valeur
      />
      <label className="search" htmlFor="input-search"></label>
    </>
  );
};

export default SearchInput;
