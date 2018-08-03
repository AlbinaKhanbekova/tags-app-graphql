
import { GET_TAG } from "../AddTodo/queries";

export default {
    // resolvers field removed from here, no longer nested
    Mutation: {
        addTag: (_, { type, label }, { cache }) => {
            console.log("addTag");
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
        }
    }

}