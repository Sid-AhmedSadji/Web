import Header from "./Header.jsx"
import Messages from "./SectionMessages.jsx"
import api from "./ApiCalls.js"
import styles from './Css/Home.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  //Déclaration des états locaux pour la gestion des messages, de l'utilisateur et des filtres
  const [loading, setLoading] = useState(true);
  const [listeMessages, setListeMessages] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSettingTitle, setIsSettingTitle] = useState(true);
  const [User, setUser] = useState('');
  const [isPrivate, setIsPrivate] = useState("public");
  const [filter, setFilter] = useState('');
  const [filterBegging, setFilterBegging] = useState(null);
  const [filterEnd, setFilterEnd] = useState(null);
  let navigate = useNavigate();

  //Utilise useEffect pour vérifier l'utilisateur et charger des données
  useEffect(() => {
    if (props.user === null) { //Redirige, si aucun utilisateur n'est connecté
      navigate("/Login");
    }

    async function fetchData() {  //Fonction asynchrone pour récupérer les données
      try {
        const response = await api.checkSession(); //Vérifie la session
        setUser(response); //Définit le type d'utilisateur
        const data = await api.getMessages({ privacy: isPrivate, id: null, filter: filter });
        let res = data.messages; //Filtre les messages en fonction du texte, de la date de début et de fin
        if (filter !== "") {
          res = data.messages.filter(message => message.message.includes(filter) || message.author_name.includes(filter) || message.title.includes(filter));
        }
        if (filterBegging ) {
          res = res.filter(message => new Date(message.date) >= new Date(filterBegging));
        }
        if (filterEnd ) {
          res = res.filter(message => new Date(message.date) <= new Date(filterEnd));
        }
        
        setListeMessages(res); //Met à jour l'état avec les messages filtrés
      } catch (error) {
        console.error('Error:', error);
        props.setUser(null)
      } finally {
        setLoading(false); //Arrête le chargement
      }
    }
    fetchData();
  }, [props.user, navigate, isPrivate, filter,loading, filterBegging, filterEnd]); //Dépendances de useEffect (C'est à dire qu'il se ré-exécutera si un de ces composants est modifié.)

  //Gestion des entrées utilisateur pour les messages
  async function handleKeyPress(e) {
    if (e.key === 'Enter') { //Lorsque l'utilisateur appuie sur Entrée
      if (isSettingTitle) {
        if (title.length > 0) {
          setIsSettingTitle(false); //Switch to message input(Passe à l'entrée du message)
        }
      } else {
        if (message.length > 0) {
          await api.postMessage({ title, id_Parent: "0", message, privacy: isPrivate });
          setTitle(''); //Réinitialise le titre
          setMessage(''); //Réinitialise le message
          setIsSettingTitle(true); // Switch back to title input
          setLoading(true); //Réactive le chargement
        }
      }
    }
  }

  //Bascule entre les vues de messages publics et privés
  async function switchPrivacy(newPrivacy) {
    setIsPrivate(newPrivacy); //Change le statut de confidentialité
    setFilter(''); //Réinitialise le filtre
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.globalDiv}>
      <Header setFilter={setFilter} filter={filter} setFilterBegging={setFilterBegging} setFilterEnd={setFilterEnd} searchBar shearchBar={true} user={User.usertype} idUser={User.userid}/>
      <div className={styles.mainSection}>
        <input type="text" placeholder={isSettingTitle ? "New message ? Choose a title for your message" : "What is your message ?"} value={isSettingTitle ? title : message} onChange={(e) => { isSettingTitle ? setTitle(e.target.value) : setMessage(e.target.value) }} onKeyPress={handleKeyPress} className={styles.myLabel} />
        <hr align="center" width="75%" />
        <Messages listeMessages={listeMessages} loading={setLoading} type={User.usertype} idUser={User.userid} />
      </div>
      {User.usertype === "admin" &&
        <div className={styles.switch}>
          <button className={isPrivate === "public" ? styles.active : null} onClick={() => switchPrivacy("public")}>Public</button>
          <button className={isPrivate === "private" ? styles.active : null} onClick={() => switchPrivacy("private")}>Private</button>
        </div>
      }
    </div>
  );
}

export default Home;
