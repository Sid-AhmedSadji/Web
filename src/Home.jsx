import Header from "./Header.jsx"
import Messages from"./SectionMessages.jsx"

import styles from './Css/Home.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home (){

  var listeMessages = [
    {
        "author_name": "Dido",
        "author_id": "27",
        "text": "New Message",
        "_id": "0jd6M8cEMRqVPuKK"
    },
    {
        "author_name": "user1",
        "author_id": "21",
        "text": "message1",
        "_id": "9a0hnDw3nJljzViW"
    },
    {
        "author_name": "CR7",
        "author_id": "18",
        "text": "Je saute haut",
        "_id": "Az12pLoxwjcbyCAg"
    },
    {
        "author_name": "LM10",
        "author_id": "17",
        "text": "8 ballons d'or et 1 cdm",
        "_id": "E52MuKA5nrbGKYDZ"
    },
    {
        "author_name": "KM7",
        "author_id": "19",
        "text": "Je cours vite",
        "_id": "HBJp4gmHMvZv2fti"
    },
    {
        "author_name": "BobbyF",
        "author_id": "2",
        "text": "Je suis un monstre aux echecs + tout le monde peut être fort",
        "_id": "Svn2foDgw74joe0u"
    },
    {
        "author_name": "HikaruN",
        "author_id": "3",
        "text": "here here here takes takes takes takes there check move mate",
        "_id": "Zz2ZJIiehd0Bd4TC"
    },
    {
        "author_name": "CR7",
        "author_id": "18",
        "text": "5 ballons d'or et 0 cdm",
        "_id": "h83bIP7FV27cz185"
    },
    {
        "author_name": "MagnusC",
        "author_id": "1",
        "text": "Je suis le numéro 1 au monde aux échecs",
        "_id": "k0ln2rrucfgWM7nk"
    },
    {
        "author_name": "BobbyF",
        "author_id": "2",
        "text": "J'aime voir mes adversaires se battre pour esperer ne serait ce faire un nul contre moi",
        "_id": "t8auJ50Jl4lbXkWH"
    },
    {
        "author_name": "user2",
        "author_id": "22",
        "text": "message2",
        "_id": "xhHgAu4UGJEiMgDk"
    },
    {
        "author_name": "Dido",
        "author_id": "27",
        "text": "New Message",
        "_id": "0jd6M8cEMRqVPuKK"
    },
    {
        "author_name": "user1",
        "author_id": "21",
        "text": "message1",
        "_id": "9a0hnDw3nJljzViW"
    },
    {
        "author_name": "CR7",
        "author_id": "18",
        "text": "Je saute haut",
        "_id": "Az12pLoxwjcbyCAg"
    },
    {
        "author_name": "LM10",
        "author_id": "17",
        "text": "8 ballons d'or et 1 cdm",
        "_id": "E52MuKA5nrbGKYDZ"
    },
    {
        "author_name": "KM7",
        "author_id": "19",
        "text": "Je cours vite",
        "_id": "HBJp4gmHMvZv2fti"
    },
    {
        "author_name": "BobbyF",
        "author_id": "2",
        "text": "Je suis un monstre aux echecs + tout le monde peut être fort",
        "_id": "Svn2foDgw74joe0u"
    },
    {
        "author_name": "HikaruN",
        "author_id": "3",
        "text": "here here here takes takes takes takes there check move mate",
        "_id": "Zz2ZJIiehd0Bd4TC"
    },
    {
        "author_name": "CR7",
        "author_id": "18",
        "text": "5 ballons d'or et 0 cdm",
        "_id": "h83bIP7FV27cz185"
    },
    {
        "author_name": "MagnusC",
        "author_id": "1",
        "text": "Je suis le numéro 1 au monde aux échecs",
        "_id": "k0ln2rrucfgWM7nk"
    },
    {
        "author_name": "BobbyF",
        "author_id": "2",
        "text": "J'aime voir mes adversaires se battre pour esperer ne serait ce faire un nul contre moi",
        "_id": "t8auJ50Jl4lbXkWH"
    },
    {
        "author_name": "user2",
        "author_id": "22",
        "text": "message2",
        "_id": "xhHgAu4UGJEiMgDk"
    }
]


return (
    <div className={styles.globalDiv}>
      <Header />
      <hr align="center" width="75%" />
      <div className={styles.mainSection}>
        <div className={styles.globalDiv2}>
          <input type="text" placeholder="New message ?" className={styles.myLabel}/>
          <hr align="center" width="75%" />
          <div className={styles.center}>
            <Messages listeMessages={listeMessages} />
          </div>
        </div>
        <div className={styles.infoPanel}>
          <p>Info panel</p>
          <p>Nombre d'utilisateur : 0</p>
          <p>Nombre de message : 0 </p>
        </div>
      </div>
    </div>
  );
}
export default Home ;
