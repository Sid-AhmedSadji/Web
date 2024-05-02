import React from 'react';
import styles from './Css/StylisedLabel.module.css'

//Définition du composant SearchInput qui prend 'value' et 'setValue' comme props
const SearchInput = ({ value, setValue }) => (
  <>  {/* Fragment React pour regrouper plusieurs éléments sans ajouter de nœud supplémentaire au DOM */}
    <input //Champ de saisie pour la recherche
      type="text" //Définit le type de l'input comme texte
      className={styles.inputSearch} //Application de styles CSS
      id="input-search" //ID pour associer le label
      value={value} //La valeur du champ est contrôlée par la prop 'value'
      onChange={(e) => setValue(e.target.value)} // Use an arrow function to update the value
      placeholder="Looking For ?"
    />
    <label className={styles.search} htmlFor="input-search"></label> {/* Label stylisé pour le champ de saisie */}
  </>
);

export default SearchInput;

