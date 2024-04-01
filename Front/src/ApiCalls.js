import axios from 'axios';

class Api {

  static api = "http://localhost:4000/api";

  static async postMessage(props) {

    const { message, id_Parent, title,privacy } = props;

    const date = new Date();

      const id = await this.checkSession();
      const response = await axios.put(Api.api + '/message', {
        message,
        id_Parent,
        title,
        date,
        userid: id.data.userid,
        privacy
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

  }

  static async getUser(props ) {
    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/users', {
      params: props
    });
    return response;
}

  static async checkSession() {
      axios.defaults.withCredentials = true;
      const response = await axios.get(Api.api + '/session');
      return response;
  }

  static async login(props) {
    const {login, password} = props;
    const response = await axios.post(Api.api + '/user/login', {
      login,
      password
    });
    return response;
    
  }

  static async postUser(props) {

    const { pseudo, password, lastname, firstname } = props.pseudo;

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
      return response;
  }

  static async logout() {

  }

  static async changeTypeUser(props){
    const {id,type} = props;
    try{

      axios.defaults.withCredentials = true;
      const response = await axios.post(Api.api + '/changeType', {
        id,
        type
      });
      if (response.status !== 200) {
        throw new Error('Failed to get user');
      }
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }

  }

  static async getMessages(props) {
    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/messages/' + props);
    return response;

  }

}

export default Api;
