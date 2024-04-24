import React from 'react' //Importe la bibliothèque React, nécessaire pour utiliser JSX et construire des composants React.
import ReactDOM from 'react-dom/client' //Importe ReactDOM spécifiquement depuis le package react-dom/client, qui est utilisé pour interagir avec le DOM dans le navigateur.
import App from './App.jsx'  //Importe le composant App depuis le fichier App.jsx situé dans le même répertoire. Ce composant est donc le composant racine qui englobe tous les autres composants de l'application.
import './Css/index.css' //Importe le fichier CSS pour styliser l'application. Ce fichier est donc placé dans le dossier Css et appliquera des styles globaux à notre application. Comme le background du site web par exemple.

//Crée une racine de rendu à l'élément DOM avec l'identifiant root. Cela signifie donc que l'application React sera intégrée dans cet élément 'root'.
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
    </>
)


//Le fichier main.jsx est le (fichier racine) point d'entrée de l'application React. Il met en place le rendu du composant App dans le DOM du navigateur, ce qui initie l'ensemble de l'interface utilisateur de notre application web.
