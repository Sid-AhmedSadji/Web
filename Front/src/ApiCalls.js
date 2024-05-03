import axios from 'axios'; //Importe Axios pour faire des requêtes HTTP
import bcrypt from "bcryptjs"; //Importe bcryptjs pour hasher les mots de passe

class Api {
  //Définition des propriétés statiques utilisées dans les méthodes de la classe
  static salt = "$2a$10$x6mRCNZP25VY/LSH78lao.";
  static api = "http://localhost:4000/api"; //Base URL pour les appels API

  //Méthode pour hasher un mot de passe avant l'envoi au serveur
  static hashPassword(password) {
    // Utilise bcrypt pour hasher le mot de passe avec le salt défini en dur dans la classe pour eviter differents hash pour le meme mot de passe 
    return bcrypt.hashSync(password, Api.salt); 
  }

  //Méthode pour publier un message
  static async postMessage(props) {

    const { message, id_Parent, title,privacy } = props; //Extraction des propriétés de l'objet props

    const date = new Date(); //Obtention de la date actuelle

    const id = await this.checkSession(); //Vérifie la session de l'utilisateur
    
    const response = await axios.post(Api.api + '/message', { //Envoie une requête POST pour créer/modifier un message
        message,
        id_Parent,
        title,
        date,
        userid: id.userid,
        privacy,
      }, {
        headers: {
          'Content-Type': 'application/json' //Spécifie le type de contenu envoyé au serveur
        }
      });
      return response.data //Retourne les données de la réponse

  }

  //Méthode pour récupérer les informations d'un utilisateur
  static async getUser(props ) {
    axios.defaults.withCredentials = true; //Configure Axios pour envoyer les cookies avec les requêtes
    const response = await axios.get(Api.api + '/users', { //Envoie une requête GET pour obtenir des données utilisateur
      params: props
    });
    return response.data; //Retourne les données de la réponse
}

  //Méthode pour vérifier la session de l'utilisateur
  static async checkSession() {
      axios.defaults.withCredentials = true;
      
      const response = await axios.get(Api.api + '/session'); //Envoie une requête GET pour vérifier la session
      return response.data; //Retourne les données de la réponse
  }

  //Méthode pour se connecter
  static async login(props) {
    const {login, password} = props;
    const hastedPassword=this.hashPassword(password); //Hash le mot de passe avant l'envoi
    const response = await axios.post(Api.api + '/user/login', { //Envoie une requête POST pour le login
      login,
      password: hastedPassword
    });
    return response.data;
    
  }

  //Méthode pour enregistrer un nouvel utilisateur
  static async postUser(props) {
    const { pseudo, password, lastname, firstname } = props;
      const hastedPassword=this.hashPassword(password); //Hash le mot de passe avant l'envoi
      axios.defaults.withCredentials = true;
      const response = await axios.post(Api.api + '/user', { 
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

  //Méthode pour se déconnecter
  static async logout() {

    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/user/logout'); //Envoie une requête GET pour se déconnecter
    return response.data;

  }

  //Méthode pour changer le type d'un utilisateur
  static async changeTypeUser(props){
    const {id,type} = props;
      axios.defaults.withCredentials = true;
      const response = await axios.post(Api.api + '/changeType', {
        id,
        type
      });
      if (response.status !== 200) { //Vérifie si la requête a réussi
        throw new Error('Failed to get user');  //Lance une exception si échec
      }
      return response.data;

  }

  //Méthode pour obtenir des messages
  static async getMessages(props = {}) {
    const { id = null, privacy = null, filter } = props;
    axios.defaults.withCredentials = true;
    const response = await axios.get(Api.api + '/messages', {
      params: { id, privacy,filter }
    });

    return response.data;
  }

  //Méthode pour obtenir les messages enfants d'un message spécifique
  static getChildrenMessage(listeMessages, id) {
    const childrenMessages = listeMessages.filter(message => message.id_Parent === id); //Filtre les messages enfants
    if (childrenMessages.length === 0) return null; //Si aucun enfant, retourne null
    let result = [childrenMessages[0]]; //Commence avec le premier message enfant
    childrenMessages.forEach(childMessage => {
        const grandchildren = this.getChildrenMessage(listeMessages, childMessage._id); //Récupère les enfants des enfants
        result = result.concat(grandchildren); //Ajoute les petits-enfants au résultat
    });
    return result;
  }

  //Méthode pour supprimer un message
  static async deleteMessage(id) {
    axios.defaults.withCredentials = true;
    const messages = await Api.getMessages(); //Obtient tous les messages
    const listToDelete = [ messages.messages.filter(message => message._id === id)[0] ]; //Trouve le message à supprimer
    const children = this.getChildrenMessage(messages.messages, id); //Obtient tous les messages enfants

    if (Array.isArray(children)) {
        listToDelete.push(...children); //Ajoute les enfants à la liste de suppression
      } else if (children) {
    } else if (children) {
        listToDelete.push(children);
    }

    let response= [] ;
    for (const message of listToDelete) {
        if (message) {
            response.push(await axios.delete(Api.api + `/message/${message._id}`)); //Envoie une requête DELETE pour chaque message
        }
    }
    return response.data;
  }

  static async reportMessage(id, author_name) {
    axios.defaults.withCredentials = true;
    const response = await axios.put(Api.api + '/report', {
      id,
      author_name
    });
    return response.data;
  }

  //Méthode pour obtenir une conversation entre deux utilisateurs
  static async getConversation(userId, peerId) {
    const response = await fetch(`/api/private-messages/conversation?user1=${userId}&user2=${peerId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  }
  
  //Méthode pour envoyer un message privé
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

export default Api; //Exporte la classe Api pour l'utiliser ailleurs dans l'application
