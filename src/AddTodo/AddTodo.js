import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { GET_TAG, REMOVE_TAG } from './queries';

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// const updateCache = (cache, { data: { removeTag } }) => {
//     console.log("updateCache", removeTag);
//     const { allTags } = cache.readQuery({ query: GET_TAG });
//     const filterTags = allTags.filter(tag => tag.id !== removeTag)

//     cache.writeQuery({
//         query: GET_TAG,
//         data: {
//             allTags: filterTags
//         }
//     })
// };

class AddTodo extends Component {
    render() {
        const type = "Company";
        return (
            <Query query={GET_TAG} variables={{ type }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;
                    const { allTags } = data;

                    if (allTags && allTags.length === 0) return null;
                    return (
                        <div>
                            <List>
                                {allTags.map((tag, i) => (

                                    <Mutation mutation={REMOVE_TAG} key={`${tag.label}-${i}`}>
                                        {
                                            (removeTag, { data, loading, error }) => (
                                                <ListItem disabled={loading} divider={true}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <i style={{ verticalAlign: "text-top", fontWeight: "bold" }} className="material-icons">#</i>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={tag.label} secondary={tag.type} />
                                                    <ListItemSecondaryAction >
                                                        <IconButton aria-label="Delete" onClick={
                                                            async e => {
                                                                e.preventDefault();
                                                                await removeTag({ variables: { id: tag.id } });
                                                            }
                                                        }>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        }
                                    </Mutation>

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