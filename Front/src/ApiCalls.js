import axios from 'axios';

class Api {

  static api = "http://localhost:4000/api";
  // static api = "http://192.168.1.55:4000/api";

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
    const response = await axios.post(Api.api + '/user/login', {
      login,
      password
    });
    return response.data;
    
  }

  static async postUser(props) {
    const { pseudo, password, lastname, firstname } = props;

      axios.defaults.withCredentials = true;
      const response = await axios.put(Api.api + '/user', { 
        login: pseudo,
        password,
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
    const { id = null, privacy = null } = props;
    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/messages', {
      params: { id, privacy }
    });

    return response.data;
  }

}

export default Api;
