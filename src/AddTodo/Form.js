import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TAG, GET_TAG } from './queries';
import { Input, Button, FormGroup, Grid } from '@material-ui/core';

const updateCache = (cache, { data: { addTag } }) => {
    const { allTags } = cache.readQuery({ query: GET_TAG });

    console.log(allTags);
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
                        <Grid item xs={5} >
                            <FormGroup
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const input = e.currentTarget.getElementsByTagName('input')[0];
                                    const label = input.value;
                                    console.log(label);
                                    await addTag({ variables: { type: "Company", label } });
                                    input.value = '';
                                }}
                            >
                                <Input placeholder="Text here..." />
                                <Button type="submit" color="primary" variant="contained">Add tag</Button>
                            </FormGroup>
                        </Grid>
                    )
                }

            </Mutation>
        )
    }
}

export default Form;