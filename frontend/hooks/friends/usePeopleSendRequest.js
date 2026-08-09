import {apiFetch} from "../../lib/api";

import {useMutation, useQueryClient } from "@tanstack/react-query";

function usePeopleSendRequest() {
    const query = useQueryClient();

    return (
        useMutation({
                mutationFn: async ({id}) => {
                    const response = await apiFetch(`/django/send/`, {
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
                    query.setQueryData(["friendsSuggestions"], old => (
                        old.filter(friend => friend.id !== id)
                    ));
                },
                onSettled: () => {
                    query.invalidateQueries({queryKey: ["friendsSuggestions"]});
                }
            }
        ));
}


export default usePeopleSendRequest;