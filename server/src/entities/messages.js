const MongoClient = require("mongodb").MongoClient;

class Messages {

    constructor(db) {
        (async () => {
          this.client = await MongoClient.connect(db);
        })();
    }

    async create(message, id, date, author_name, id_Parent, title) {
        try {
            const result = await this.client.db().collection('Messages').insertOne({
                _id:id,
                message: message,
                date: date,
                author_name: author_name,
                id_Parent: id_Parent,
                title: title
            })
            return result;
        } catch (err) {
            throw err;
        }
    }

    async get(id) {
        try {
            const query = id == null ? {} : { _id: id };
            console.log(query);
            const result = await this.client.db().collection('Messages').find(query).toArray();
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async exists(title) {
        try {
            const result = await this.client.db().collection('Messages').findOne({
                title: title
            });
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

exports.default = Messages ;