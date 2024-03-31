class Api {

  // Fonctions permettant de communiquer avec l'API
  static api = "http://localhost:4000/api";

  // poster un message dans l'API
  static async postMessage(props) {

    const { message, id_Parent, title } = props;

    const date = new Date().toLocaleString();
    try {

      const id = await this.checkSession();
      const response = await fetch(Api.api + '/message', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          id_Parent,
          title,
          date,
          userid: id
        }),
        credentials: "include",

      })
      if (response.status !== 201) {
        throw new Error('Failed to post message');

      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error:', error);
    }

  }


  static async getUser(id, login) {
    try {
      if (!id && !login) {
        throw new Error("Undefined Parameters");
      }

      const querry = id ? `/${id}` : `/pseudo/${login}`;

      const response = await fetch(Api.api + '/user' + querry, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",

      });
      if (response.status !== 200) {
        throw new Error('Failed to get user');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null ;
    }
  }

  static async checkSession() {
    try {
      const response = await fetch(Api.api + '/session', {
        method: 'GET',
        credentials: "include",
      });

      if (response.status !== 200) {
        throw new Error('Failed to get user :' );
      }
      const data = await response.json();
      return data.userid;
    } catch (error) {
      console.error('Error:', error);
      return null ;
    }
  }

  static async login(props) {

    const { login, password } = props;
    
    try{
      const response = await fetch(Api.api + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          credentials: "include",
          body: JSON.stringify({
            login,
            password,
          })
    });
    if (response.status !== 200) {
      throw new Error('Failed to get user');
    }
    return true ;
  } catch (error) {
    console.error('Error:', error);
    return false ;
  }
    


  }

  static async postUser(props) {

    const { pseudo, password } = props;

    try {
      const response = await fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ pseudo, password })
      });

      console.log(response);
      if (response.status === 409) {
        throw new Error({message:'Pseudo already exists',status : 409});
      }else if (response.status !== 201) {
        throw new Error({message:'Failed to post user',status : response.status});
      }
      return true ;
    } catch (error) {
      console.error('Error:', error);
      return error ;
    }
  }

  static async logout() {
    
  }

  static async getMessages() { 

    try {
      const response = await fetch(Api.api + '/messages', {
        method: 'GET', 
        credentials: "include",
      });
      if (response.status!==200) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      return data.messages;
    } catch (error) {
      console.error('Error:', error);
      return null ;
    }
  }

}

export default Api
