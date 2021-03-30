import {ApolloServer, gql} from 'apollo-server-micro';
import {makeExecutableSchema} from "graphql-tools";
import {MongoClient} from 'mongodb';
import data from './data.json';
import {ApolloClient, InMemoryCache} from "@apollo/client";



const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});


const typeDefs = gql`
    type Query {
        users: [User!]!
        user(id:String!): User!
    }
    type User {
        id: String
        name: String
        color: String
    }
`;




const resolvers = {
    Query :{
        users(parent, args, context , info) {
            console.log(context , "this is context")
            // _context.db
            //     .collection('users')
            //     .find().then((callback) => {
            //         console.log(callback , 'this is team')
            //     })
            return data.users
        },
        user(parent, args, context) {
            // context.db
            //     .collection('users')
            //     .findOne({'id': args.id}).then((callback) => {
            //         console.log(callback , 'this is solo')
            //     })
            return data.users
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

                if (!dbClient.isConnected()) await dbClient.connect();
                db = dbClient.db('next-graphql'); // database name
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