import SingleMessage from "./Message"

import styles from './Css/SectionMessages.module.css'

function Messages ({listeMessages}) {



  return (
    <div className={styles.center}>
      {
        listeMessages.map( message =>{
          return(
            <div className={styles.main}>
              <ul>
                <li>
                  <SingleMessage titre={message.author_name} message={message.text} id={message._id}/>
                </li>
              </ul>
            </div>
          )
        })
      }
    </div>
  )
};

export default Messages ;
