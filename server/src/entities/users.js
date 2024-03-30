const MongoClient = require("mongodb").MongoClient;

class Users {
  constructor(db) {
    (async () => {
      this.client = await MongoClient.connect(db);
    })();
  }

  async create(login, password ,id,type) {
    try {
      console.log(id);
      const result = await this.client.db().collection('Users').insertOne({
        _id:id,
        login: login,
        password: password,
        type: type
      });
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }


  async get(userid, login) {
    try {
      const query = userid == null ? {} : { _id: userid };
      if (login != null) {
        query.login = login;
      }
      const result = await this.client.db().collection('Users').find(query).toArray();
      if (result.length === 0) {
        throw new Error('User not found');
      }

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
        _id: Number(id)
      });
      console.log("result",result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async update(id, type) {
    try {
      const result = await this.client.db().collection('Users').updateOne({
        _id: Number(id)
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
