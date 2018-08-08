
import { GET_TAG, GET_CURRENT_TAG } from "../AddTodo/queries";
import defaults from './defaults';

export default {
    // resolvers field removed from here, no longer nested
    Mutation: {
        addTag: (_, { type, label }, { cache }) => {
            const { allTags } = cache.readQuery({ query: GET_TAG });
            let index = 0;
            if (allTags && allTags.length) {
                index = allTags[allTags.length - 1].id + 1;
            }

            const newTag = {
                __typename: 'Tag',
                id: index,
                type,
                label,
            };

            cache.writeQuery({
                query: GET_TAG,
                data: {
                    allTags: [...allTags, newTag]
                }
            })


            console.log("addTag", cache.readQuery({ query: GET_TAG }));

            return newTag;

        },
        removeTag: (_, { id }, { cache }) => {
            console.log("removeTag");
            const { allTags } = cache.readQuery({ query: GET_TAG });
            // addTag.type = "Company";
            const filterTags = allTags.filter(tag => tag.id !== id)

            cache.writeQuery({
                query: GET_TAG,
                data: {
                    allTags: filterTags
                }
            })
        },
        updateCurrentTag: (_, { type, label }, { cache }) => {
            const { currentTag } = cache.readQuery({ query: GET_CURRENT_TAG });
            console.log("updateCurrentTag", currentTag, type, label);

            cache.writeQuery({
                query: GET_CURRENT_TAG,
                data: {
                    currentTag: {
                        __typename: 'TagForm',
                        label: label,
                        type: type,
                        typeTitle: currentTag.typeTitle,
                        labelTitle: currentTag.labelTitle
                    }
                }
            });
        },
        resetCurrentTag: (_, d, { cache }) => {
            cache.writeData({ data: { currentTag: defaults.currentTag } })
        }
    }

}