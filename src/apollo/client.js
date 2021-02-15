import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  link: HttpLink({
    uri: `/.netlify/functions/todoList`,
    fetch,
  }),
  cache: new InMemoryCache(),
})
