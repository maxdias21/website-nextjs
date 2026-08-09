import {useMutation, useQueryClient} from "@tanstack/react-query";

import {apiFetch} from "../../lib/api";

function useUserPatch() {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: async (formData) => {
                const response = await apiFetch(`/django/create-user/`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData),
                });


                let data;
                if (!response.ok) {
                    if (response.status === 500) {
                        throw {message: "Servidor indisponível ou erro de rede"};
                    }
                    data = await response.json();
                    throw data;
                }

                data = await response.json();

                return data;

            },
            onSuccess: (data, variables) => {

                queryClient.setQueryData(["leftPersonDetail"], (old) => {
                    return {
                        ...old,
                        user: {
                            ...old.user,
                            ...variables
                        }
                    };
                });
            }
        })
    );
}

export default useUserPatch;