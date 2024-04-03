const MongoClient = require("mongodb").MongoClient;

class Users {
  constructor(db) {
    (async () => {
      this.client = await MongoClient.connect(db);
    })();
  }

  async create(login, password, lastname, firstname,id) {
    try {
      const result = await this.client.db().collection('Users').insertOne({
        _id:id,
        login: login,
        password: password,
        lastname: lastname,
        firstname: firstname,
        type: "0"
      });
      return result;
    } catch (err) {
      throw err;
    }
  }


  async get(userid, login,type) {
    try {
      const query = userid == null ? {} : { _id: userid };
      if (login) {
        query.login = login;
      }
      if (type) {
        query.type = type;
      }
      const result = await this.client.db().collection('Users').find(query).toArray();

      return result;
    } catch (err) {
      throw err;
    }
  }

  async exists(login) {
    try {
      const result = await this.client.db().collection('Users').findOne({
        login: login
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async checkPassword(login, password) {
    try {
      const result = await this.client.db().collection('Users').findOne({
        login: login,
        password: password
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async

  async deleteUser(id) {
    try {
      const result = await this.client.db().collection('Users').deleteOne({
        _id: id
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async update(id, type) {
    try {
      const result = await this.client.db().collection('Users').updateOne({
        _id: id
      }, {
        $set: {
          type: type
        }
      });
      return result;
    } catch (err) {
      throw err;
    }
    
  }
}

exports.default = Users;
