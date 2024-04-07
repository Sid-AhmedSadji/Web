import axios from 'axios';
import bcrypt from "bcryptjs";

class Api {

  static salt = "$2a$10$x6mRCNZP25VY/LSH78lao.";

  //static api = "http://localhost:4000/api";


  static hashPassword(password) {
    //salt 
    return bcrypt.hashSync(password, Api.salt);
  }
  static async postMessage(props) {

    const { message, id_Parent, title,privacy } = props;

    const date = new Date();

      const id = await this.checkSession();
      const response = await axios.put(Api.api + '/message', {
        message,
        id_Parent,
        title,
        date,
        userid: id.userid,
        privacy
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data

  }

  static async getUser(props ) {
    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/users', {
      params: props
    });
    return response.data;
}

  static async checkSession() {
      axios.defaults.withCredentials = true;
      
      const response = await axios.get(Api.api + '/session');
      return response.data;
  }

  static async login(props) {
    const {login, password} = props;
    const hastedPassword=this.hashPassword(password);
    const response = await axios.post(Api.api + '/user/login', {
      login,
      password: hastedPassword
    });
    return response.data;
    
  }

  static async postUser(props) {
    const { pseudo, password, lastname, firstname } = props;
      const hastedPassword=this.hashPassword(password);
      axios.defaults.withCredentials = true;
      const response = await axios.put(Api.api + '/user', { 
        login: pseudo,
        password: hastedPassword,
        lastname,
        firstname ,

      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
  }

  static async logout() {

    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/user/logout');
    return response.data;

  }

  static async changeTypeUser(props){
    const {id,type} = props;
      axios.defaults.withCredentials = true;
      const response = await axios.post(Api.api + '/changeType', {
        id,
        type
      });
      if (response.status !== 200) {
        throw new Error('Failed to get user');
      }
      return response.data;

  }

  static async getMessages(props = {}) {
    const { id = null, privacy = null, filter } = props;
    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/messages', {
      params: { id, privacy,filter }
    });

    return response.data;
  }

  static getChildrenMessage(listeMessages, id) {
    const childrenMessages = listeMessages.filter(message => message.id_Parent === id);
    if (childrenMessages.length === 0) return null;
    let result = [childrenMessages[0]];
    childrenMessages.forEach(childMessage => {
        const grandchildren = this.getChildrenMessage(listeMessages, childMessage._id);
        result = result.concat(grandchildren);
    });
    return result;
  }



  static async deleteMessage(id) {
    axios.defaults.withCredentials = true;
    const messages = await Api.getMessages();
    const listToDelete = [ messages.messages.filter(message => message._id === id)[0] ];
    const children = this.getChildrenMessage(messages.messages, id);

    if (Array.isArray(children)) {
        listToDelete.push(...children);
    } else if (children) {
        listToDelete.push(children);
    }

    let response= [] ;
    for (const message of listToDelete) {
        if (message) {
            response.push(await axios.delete(Api.api + `/message/${message._id}`));
        }
    }
    return response.data;
}



  static async getConversation(userId, peerId) {
    const response = await fetch(`/api/private-messages/conversation?user1=${userId}&user2=${peerId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  }
  
  static async sendPrivateMessage(senderId, receiverId, text) {
    const response = await fetch('/api/private-messages/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId, receiverId, text }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  }

}

export default Api;
