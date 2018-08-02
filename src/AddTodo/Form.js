import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TAG, GET_TAG } from './queries';
import { Input, Button, FormGroup, Grid } from '@material-ui/core';

const updateCache = (cache, { data: { addTag } }) => {
    const { allTags } = cache.readQuery({ query: GET_TAG });
    addTag.type = "Company";

    cache.writeQuery({
        query: GET_TAG,
        data: {
            allTags: [...allTags, {...addTag, type: 'Company'}]
        }
    })

};

class Form extends Component {
    render() {
        return (
            <Mutation mutation={ADD_TAG} update={updateCache}>
                {
                    (addTag, { data, loading, error }) => (
                        <Grid item>
                            <form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    console.log("label");
                                    const input = e.currentTarget.getElementsByTagName('input')[0];
                                    const label = input.value;
                                    await addTag({ variables: { type: "Company", label } });
                                    input.value = '';
                                }}
                            >
                                <Input placeholder="Text here..." />
                                <Button type="submit" color="primary" variant="contained">{loading ? "Loading..." : "Add tag"}</Button>
                            </form>
                        </Grid>
                    )
                }
            </Mutation>
        )
    }
}

export default Form;