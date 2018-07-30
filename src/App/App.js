import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import client from '../Apollo/apollo-client';
import './App.css';
import AddTodo from '../AddTodo/AddTodo';
import Form from '../AddTodo/Form';
import { Grid } from '@material-ui/core';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Grid className="App">
          <h1>Tags</h1>
          <Form />
          <AddTodo />
        </Grid>
      </ApolloProvider>
    );
  }
}

export default App;
