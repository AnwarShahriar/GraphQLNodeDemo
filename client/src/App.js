import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import BookList from './components/BookList';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>MadGeek's reading list</h1>
          <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;