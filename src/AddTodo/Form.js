import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TAG, GET_TAG } from './queries';
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

    render() {
        const label = 'Add tag label';
        const type = 'Add tag type';
        return (
            <Mutation mutation={ADD_TAG}>
                {
                    (addTag, { data, loading, error }) => (
                        <Grid item>
                            <form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const inputs = [...e.currentTarget.getElementsByTagName('input')];
                                    const [labelInput] = inputs.filter(item => item.id === 'label');
                                    const [typeInput] = inputs.filter(item => item.id === 'type');

                                    console.log("label", addTag);
                                    await addTag({ variables: { type: typeInput.value, label: labelInput.value } });
                                    labelInput.value = '';
                                    typeInput.value = '';
                                }}
                            >

                                <FormGroup>
                                    <TextField
                                        label={label}
                                        type="text"
                                        margin="normal"
                                        id="label"
                                        value={"dd"}
                                        onChange={e => {
                                            

                                        }}
                                    />
                                    <TextField
                                        label={type}
                                        type="text"
                                        margin="normal"
                                        id="type"
                                        value={"dd"}
                                    />
                                    <Button type="submit" color="primary" variant="contained" margin="normal">{loading ? "Loading..." : "Add tag"}</Button>

                                </FormGroup>
                            </form>
                        </Grid>
                    )
                }
            </Mutation>
        )
    }
}

export default Form;