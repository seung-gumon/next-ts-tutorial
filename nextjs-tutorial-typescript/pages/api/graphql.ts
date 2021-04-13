import {ApolloServer, gql} from 'apollo-server-micro';
import {makeExecutableSchema} from "graphql-tools";
import {MongoClient, ObjectId} from 'mongodb';


const typeDefs = gql`
    type Query {
        users: [User!]!
        user(id:String!): User!
    }
    type User {
        _id : String
        id: String
        name: String
        color: String
    }
`;


const resolvers = {
    Query: {
        users(_parent, _args, _context, _info) {
            try {
                return _context.db
                    .collection('users')
                    .find()
                    .toArray()
                    .then((data) => {
                        return data
                    });
            } catch (e) {
                console.log(`This is ${e} `)
            }
        },
        async user(parent, args, context) {
            const {id} = args
            const user = await context.db
                .collection('users')
                .findOne({'_id': new ObjectId(id)})
            return user
        }
    },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


let db;

const apolloServer = new ApolloServer({
    schema,
    context: async () => {
        if (!db) {
            try {
                const dbClient = new MongoClient(process.env.MONGO_DB_CONNECT, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                if (!dbClient.isConnected()) {
                    await dbClient.connect();
                }
                db = dbClient.db('next'); // database name
            } catch (e) {
                console.log('--->error while connecting via graphql context (db)', e);
            }
        }

        return {db};
    },
});


export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({path: '/api/graphql'});