import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { GET_TAG } from './queries';
import Form from './Form';



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
                            <div>
                                {allTags.map((tag, i) => (
                                    <p key={`${tag.label}-${i}`}>{tag.label}</p>
                                ))}
                            </div>
                            
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default AddTodo;