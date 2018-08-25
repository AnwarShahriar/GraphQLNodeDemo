const gql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = gql

// dummy data
const data = require('./dummydata')

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genere: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return data.authors.find(author => author.id === parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return data.books.filter(book => book.authorId === parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                // get data from DB/other source
                return data.books.find(book => book.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                // get data from DB/other source
                return data.authors.find(author => author.id === args.id)
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})