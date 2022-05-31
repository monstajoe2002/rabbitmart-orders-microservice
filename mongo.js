const { MongoClient, ObjectId } = require('mongodb');
const util = require('util');

util.promisify(MongoClient.connect);

const { MONGO_URI, DB_NAME} = process.env;
let dbConnection;

const connect = async () => {
    try {
        const client = await MongoClient.connect(MONGO_URI);
        dbConnection = client.db(DB_NAME);
    } catch (e) {
        throw new Error(`Could not establish database connection: ${e}`);
    }
};

const mongoClient = async () => {
    if (!dbConnection) {
        await connect();
    }
    return dbConnection;
};

module.exports = {
    mongoClient,
    ObjectId
};
