import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


export const client = new ApolloClient({
    link: new HttpLink({
      uri: 'https://virtual-lolly-project12e.netlify.app/.netlify/functions/lolly',
      fetch,
    }),
    cache: new InMemoryCache()
  });