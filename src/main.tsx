import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import './index.css'

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
