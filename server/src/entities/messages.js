const MongoClient = require("mongodb").MongoClient;

class Messages {

    constructor(db) {
        (async () => {
          this.client = await MongoClient.connect(db);
        })();
    }

    async create(message,  date, author_name, id_Parent, title,privacy) {

        try {
            const result = await this.client.db().collection('Messages').insertOne({
                message: message,
                date: date,
                author_name: author_name,
                id_Parent: id_Parent,
                title: title,
                privacy: privacy
            })
            return result;
        } catch (err) {
            throw err;
        }
    }

    async get(id,privacy) {
        try {

            const query = id == null ? {} : { _id: id };
            privacy ? query.privacy = privacy : null
            console.log(query)
            const result = await this.client.db().collection('Messages').find(query).toArray();
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
            return result;
        } catch (err) {
            throw err;
        }
    }
}

exports.default = Messages ;