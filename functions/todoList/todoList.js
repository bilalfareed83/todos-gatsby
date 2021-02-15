const { ApolloServer, gql } = require("apollo-server-lambda")
var faunadb = require("faunadb")
q = faunadb.query

require("dotenv").config()
const typeDefs = gql`
  type Query {
    todos: [Todo!]
  }
  type Mutation {
    addTodo(task: String!): Todo
  }
  type Todo {
    id: ID!
    task: String!
    status: Boolean!
  }
`

const resolvers = {
  Query: {
    todos: async (root, args, context) => {
      // return "Hello, world!"
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.YOUR_FAUNADB_ADMIN_SECRET,
        })

        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("task"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.ref.data)
      } catch (error) {
        console.log(error)
      }
    },
    // allAuthors: () => authors,
    // author: () => {},
    // authorByName: (root, args) => {
    //   console.log("hihhihi", args.name)
    //   return authors.find(author => author.name === args.name) || "NOTFOUND"
    // },
  },

  Mutation: {
    addTodo: async (_, { task }) => {
      try {
        var adminClient = new faunadb.Client({
          secret: process.env.YOUR_FAUNADB_ADMIN_SECRET,
        })

        const result = await adminClient.query(
          q.Create(q.Collection("todos"), {
            data: {
              task: task,
              status: true,
            },
          })
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
