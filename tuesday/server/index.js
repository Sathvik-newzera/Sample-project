const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sathvik',
    database: 'userDB'
});

connection.connect();

const typeDefs = gql`
  type Query {
  getUserDetails(id : Int!) : User!
}

type Mutation {
  addProfilePicture(id : Int , uri : String) : User
}

type User {
  id : Int!
  name: String!
  email: String!
  website: String!
  profileUri: String!
}
`;

// const users = [
//     {
//         id : 1,
//         name : 'Sathvik Jrequireoel',
//         email: 'ksjoe30@gmail.com',
//         website: 'sathvikjoel.com',
//         profileUri: './../assets/images/blankImage.png'
//     },
//     {
//         id : 2,
//         name: 'Abhishek',
//         email: 'abshiek@newzera.com',
//         website: 'sharma.com',
//         profileUri: './../assets/images/blankImage.png'
//     },
//     {
//         id: 3,
//         name: 'Satyam',
//         email: 'Stayman@newzera.com',
//         website: 'Satyam.com',
//         profileUri: './../assets/images/blankImage.png'
//     }
// ]


async function getUserByID(id) {
    const results = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
    // const [rows, fields] = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
    console.log(results);
    return results[0];
}


async function changeProfileUri(id, uri) {
    const results = await new Promise((resolve, reject) => {
        connection.query(`UPDATE users SET profileUri = '${uri}' WHERE id = ${id}`, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    })
    // console.log(results);
    return getUserByID(id);
}


const resolvers = {
    Query: {
        getUserDetails: (obj, {id}, context, info) => getUserByID(id)
    },
    Mutation: {
        addProfilePicture: (obj, {id, uri}, context, info) => {
            return changeProfileUri(id, uri);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});

server.listen().then(({url}) => {
    console.log('Hello');
});