import {apiFetch} from "../../lib/api";

import {useMutation, useQueryClient } from "@tanstack/react-query";

function useFriendRequestAction({queryKey}) {
    const query = useQueryClient();

    return (
        useMutation({
                mutationFn: async ({id, action}) => {
                    const response = await apiFetch(`/django/${action}/`, {
                        method: "POST",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify({to_user_id: id}),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to add friend");
                    }

                    return await response.json();
                },
                onSuccess: (_, {id}) => {
                    query.setQueryData([queryKey], old => (
                        old.filter(friend => friend.id !== id)
                    ));
                },
                onSettled: () => {
                    query.invalidateQueries({queryKey: [queryKey]});
                }
            }
        ));
}


export default useFriendRequestAction;