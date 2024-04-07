import Header from "./Header.jsx"
import Messages from "./SectionMessages.jsx"
import api from "./ApiCalls.js"
import styles from './Css/Home.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [loading, setLoading] = useState(true);
  const [listeMessages, setListeMessages] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSettingTitle, setIsSettingTitle] = useState(true);
  const [userType, setUserType] = useState('');
  const [isPrivate, setIsPrivate] = useState("public");
  const [filter, setFilter] = useState('');
  const [filterBegging, setFilterBegging] = useState(null);
  const [filterEnd, setFilterEnd] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (props.user === null) {
      navigate("/Login");
    }

    async function fetchData() {
      try {
        const response = await api.checkSession();
        setUserType(response.usertype);
        const data = await api.getMessages({ privacy: isPrivate, id: null, filter: filter });
        let res = data.messages;
        if (filter !== "") {
          res = data.messages.filter(message => message.message.includes(filter) || message.author_name.includes(filter) || message.title.includes(filter));
        }
        if (filterBegging ) {
          res = res.filter(message => new Date(message.date) >= new Date(filterBegging));
        }
        if (filterEnd ) {
          res = res.filter(message => new Date(message.date) <= new Date(filterEnd));
        }
        
        setListeMessages(res);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [props.user, navigate, isPrivate, filter,loading, filterBegging, filterEnd]);

  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (isSettingTitle) {
        if (title.length > 0) {
          setIsSettingTitle(false); // Switch to message input
        }
      } else {
        if (message.length > 0) {
          await api.postMessage({ title, id_Parent: "0", message, privacy: isPrivate });
          setTitle('');
          setMessage('');
          setIsSettingTitle(true); // Switch back to title input
          setLoading(true);
        }
      }
    }
  }

  async function switchPrivacy(newPrivacy) {
    setIsPrivate(newPrivacy);
    setFilter('');
  }

  return (
    <div className={styles.globalDiv}>
      <Header setFilter={setFilter} filter={filter} setFilterBegging={setFilterBegging} setFilterEnd={setFilterEnd} searchBar={true} user={userType}/>
      <div className={styles.mainSection}>
        <input type="text" placeholder={isSettingTitle ? "New message ? Choose a title for your message" : "What is your message ?"} value={isSettingTitle ? title : message} onChange={(e) => { isSettingTitle ? setTitle(e.target.value) : setMessage(e.target.value) }} onKeyPress={handleKeyPress} className={styles.myLabel} />
        <hr align="center" width="75%" />
        <Messages listeMessages={listeMessages} loading={setLoading} type={userType}/>
      </div>
      {userType === "admin" &&
        <div className={styles.switch}>
          <button className={isPrivate === "public" ? styles.active : null} onClick={() => switchPrivacy("public")}>Public</button>
          <button className={isPrivate === "private" ? styles.active : null} onClick={() => switchPrivacy("private")}>Private</button>
        </div>
      }
    </div>
  );
}

export default Home;

