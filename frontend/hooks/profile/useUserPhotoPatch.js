import {useMutation} from "@tanstack/react-query";
import {apiFetch} from "../../lib/api";

function useUserPhotoPatch({...options}) {
    return (useMutation({
        mutationFn: async (formData) => {
            const response = await apiFetch("/django/profiles/me/", {
                method: "PATCH",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            return data;
        },

       ...options
    }));
}

export default useUserPhotoPatch;