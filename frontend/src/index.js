import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { createHttpLink } from 'apollo-link-http';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import { setContext } from 'apollo-link-context';
//import { split } from 'apollo-link';
//import { getMainDefinition } from 'apollo-utilities';
//import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
//import { ApolloProvider } from 'react-apollo';

// const httpLink = createHttpLink({
//     uri: 'http://backend:4000/api'
//   })
  
//   const authLink = setContext((_, { headers }) => {
//     const token = JSON.parse(localStorage.getItem('tokens'));
//     console.log("Token set in authlink:", token)
//     //const token = localStorage.getItem('TOKEN')
//     return {
//       headers: {
//         ...headers,
//         token: token ? `Bearer ${token}` : ''
//       }
//     }
//   })
  
//   const wsLink = setContext((_, { headers }) => {
//     const token = JSON.parse(localStorage.getItem('tokens'));
//     //const token = localStorage.getItem('TOKEN')
//     return {
//       headers: {
//         ...headers,
//         token: token ? `Bearer ${token}` : ''
//       }
//     }
//   })
  
//   const link = split(
//     ({ query }) => {
//       const { kind, operation } = getMainDefinition(query)
//       return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink.concat(httpLink),
//     authLink.concat(httpLink)
//   )
  
  // const token = JSON.parse(localStorage.getItem('tokens'));

  // const client = new ApolloClient({
  //   cache: new InMemoryCache(),
  //   link: new HttpLink({
  //       uri: 'http://backend:4000/api',
  //       headers: {
  //         token: token ? `Bearer ${token}` : ''
  //       },
  //   }),
   
  //   request: (operation) => {
  //     const token = JSON.parse(localStorage.getItem('tokens'))
  //     console.log("My token is:", token ? `Bearer ${token}` : '')
  //     operation.setContext({
  //       headers: {
  //         token: token ? `Bearer ${token}` : ''
  //       }
  //     })
  //   }
  // });

  // const client = new ApolloClient({
  //   link: new ApolloLink((operation, forward) => {
  //     const token = JSON.parse(localStorage.getItem('tokens'))
  //     console.log("My token is:", token ? `Bearer ${token}` : '')
  //     operation.setContext({
  //       headers: {
  //         token: token ? `Bearer ${token}` : '', 
  //       }
  //     });
  //     return forward(operation);
  //   }).concat(
  //     new HttpLink({
  //       uri: 'http://backend:4000/api',
  //     })
  //   ),
  //   cache: new InMemoryCache(),
  //   defaultOptions: {
  //     watchQuery: {
  //       fetchPolicy: 'network-only',
  //     },
  //   },
  // });


  // const client = new ApolloClient({
  //   link,
  //   cache: new InMemoryCache(),
  //   request: (operation) => {
  //     const token = JSON.parse(localStorage.getItem('tokens'))
  //     console.log(token)
  //     operation.setContext({
  //       headers: {
  //         authorization: token ? `Bearer ${token}` : ''
  //       }
  //     })
  //   }
  // })

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
