import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import client from '../Apollo/apollo-client';
import './App.css';
import AddTodo from '../AddTodo/AddTodo';
import Form from '../AddTodo/Form';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Tags</h1>
          <Form />
          <AddTodo />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
