import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const API_HOST = "http://localhost:4000";

// Configuración del host al que va a estar conectado apollo
const httpLink = createHttpLink({
  uri: API_HOST,
});

//
/**
 * En caso de que se quiera interceptar los headers por ejemplo para agregar
 * el token aquí es en donde se puede configurar
 */
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    },
  };
});

// Crea el cliente de apollo
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: authLink.concat(httpLink),
});

export default client;
