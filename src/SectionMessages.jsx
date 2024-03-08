import React from 'react'
import SingleMessage from "./Message"

import styles from './Css/SectionMessages.module.css'

function Messages ({listeMessages, setPage}) {



  return (
    <div className={styles.main}>
    <ul className={styles.myUl}>
      {
        listeMessages.map( message =>{
          return(
            <>
            <li className={styles.myLi} >
              <SingleMessage setPage={setPage} titre={message.author_name} message={message.text} id={message._id}/>
            </li>
            </>
          )
        })
      }
      </ul>
    </div>
  )
};

export default Messages ;
