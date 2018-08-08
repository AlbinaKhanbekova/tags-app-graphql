import React, { Component } from 'react';
import { Query, Mutation, graphql, compose } from 'react-apollo';
import { ADD_TAG, UPDATE_CURRENT_TAG, GET_CURRENT_TAG, RESET_CURRENT_TAG } from './queries';
import { Button, FormGroup, Grid, TextField } from '@material-ui/core';

// const updateCache = (cache, { data: { addTag } }) => {
//     const { allTags } = cache.readQuery({ query: GET_TAG });
//     addTag.type = "Company";

//     cache.writeQuery({
//         query: GET_TAG,
//         data: {
//             allTags: [...allTags, { ...addTag, type: 'Company' }]
//         }
//     })

// };

class Form extends Component {

    async onSubmitHandler(e, { type, label }, addCallback, cleanCallback) {
        e.preventDefault();

        console.log("label");
        await addCallback({ variables: { type: type, label: label } });
        await cleanCallback();
        // labelInput.value = '';
        // typeInput.value = '';
    }

    render() {
        console.log("props", this.props);
        return (
            <Query query={GET_CURRENT_TAG}>
                {({ loading, error, data: { currentTag } }) => {
                    console.log("currentTag", currentTag);


                    return <Mutation mutation={ADD_TAG}>
                        {
                            (addTag, { data, loading, error }) => (
                                <Grid item>
                                    <form
                                        onSubmit={async e => {
                                            await this.onSubmitHandler(e, currentTag, addTag, this.props.resetCurrentTag);
                                        }}
                                    >

                                        <FormGroup>
                                            <Mutation mutation={UPDATE_CURRENT_TAG}>
                                                {
                                                    (updateCurrentTag, { data, loading, error }) => (
                                                        <div>

                                                            <TextField
                                                                label={currentTag.labelTitle}
                                                                type="text"
                                                                margin="normal"
                                                                id="label"
                                                                value={currentTag.label}
                                                                onChange={e => {
                                                                    console.log(e.target.value);
                                                                    updateCurrentTag({ variables: { ...currentTag, label: e.target.value } })
                                                                }}
                                                            />
                                                            <TextField
                                                                label={currentTag.typeTitle}
                                                                type="text"
                                                                margin="normal"
                                                                id="type"
                                                                value={currentTag.type}
                                                                onChange={e =>
                                                                    updateCurrentTag({ variables: { ...currentTag, type: e.target.value } })
                                                                }
                                                            />
                                                        </div>

                                                    )
                                                }
                                            </Mutation>
                                            <Button type="submit" color="primary" variant="contained" margin="normal">{loading ? "Loading..." : "Add tag"}</Button>

                                        </FormGroup>
                                    </form>
                                </Grid>
                            )
                        }
                    </Mutation>
                }}
            </Query>
        )
    }
}

export default compose(
    graphql(RESET_CURRENT_TAG, { name: 'resetCurrentTag' })
)(Form);