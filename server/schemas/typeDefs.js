const typeDefs = `

type User {
  _id: ID
  username: String
  email: String
  password: String
  savedBooks: [Book]
}

type Book {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
}

type Auth {
    token: ID
    user: User
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(authors: [String]!, description: String!, bookId: String!, image: String, link: String, title: String! ): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;


//Refactor this to reference books, User, Auth, Query and Mutations. Models hold first
//3 Items, rest need research. [DONE]