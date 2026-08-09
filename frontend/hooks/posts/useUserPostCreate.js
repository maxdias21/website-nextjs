import {useMutation} from "@tanstack/react-query";

import {apiFetch} from "../../lib/api";

function useUserPostCreate({options}) {
    return (
        useMutation({
            mutationFn: async (formData) => {
                const response = await apiFetch("/django/posts/", {
                    method: "POST",
                    body: formData,
                });


                if (!response.ok) {
                    if (response.status === 500) {
                        throw new Error("Erro interno no servidor, tente novamente.");
                    }

                    const result = await response.json();
                    throw new Error(JSON.stringify(result));
                }

                return response.json();
            },
            ...options,

        })
    );
}

export default useUserPostCreate;