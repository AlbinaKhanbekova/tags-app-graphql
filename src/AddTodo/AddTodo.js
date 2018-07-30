import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { GET_TAG } from './queries';
import Form from './Form';

import { List, ListItemIcon, ListItem, ListItemText } from '@material-ui/core';



class AddTodo extends Component {
    render() {
        const type = "Company";
        return (
            <Query query={GET_TAG} variables={{ type }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;
                    const { allTags } = data;

                    console.log("AddTodo", data);
                    return (
                        <div>
                            <List>
                                {allTags.map((tag, i) => (
                                    <ListItem key={`${tag.label}-${i}`}>
                                        <ListItemIcon>
                                            <i style={{verticalAlign: "text-bottom", fontWeight:"bold"}} className="material-icons">#</i>
                                        </ListItemIcon>
                                        <ListItemText primary={tag.label} />
                                    </ListItem>
                                ))}
                            </List>

                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default AddTodo;