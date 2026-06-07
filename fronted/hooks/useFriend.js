import {apiFetch} from '../lib/api';

import {useMutation, useQueryClient} from '@tanstack/react-query';

function useFriend() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({user_id, url, options}) => {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await apiFetch(
                url,
                options,
            );
            return response.data;
        },

        onMutate: async ({user_id, relationship}) => {
            const optimisticRelationship = relationship === 'none' ? 'request_sent' : relationship;

            queryClient.setQueryData(['profiles'], (old = []) =>
                old.map((item) => {
                    return item.id === user_id
                        ? {...item, relationship: optimisticRelationship}
                        : item;
                })
            )},

        onError: (error, variables, context) => {
            queryClient.setQueryData(['profiles'], context?.previous);
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['profiles']});
        }
    });

    return {mutation};
}

export default useFriend;