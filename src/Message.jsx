import styles from './Css/Message.module.css'
import rgbStyle from './Css/RGB.module.css'

function Message({titre, message}){
  var msg = message

  if (message.length > 75 ){
    msg = message.slice(0,75) + " [...]"
  }
  return (
    <div className={styles.message}>
      <p>${titre}</p>
      <p>${msg}</p>
      <button className={styles.button85}>+</button>
    </div>

  );

}

export default Message
