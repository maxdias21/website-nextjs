import {useMutation} from "@tanstack/react-query";
import {apiFetch} from "../../lib/api";

function usePhotosDelete(options={}) {
    return useMutation({
        mutationFn: async (id) => {
            const response = await apiFetch(`/django/photos/${id}/`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error("Failed to delete photo");
            }

            return response;
        },
        ...options,
    });
}

export default usePhotosDelete;