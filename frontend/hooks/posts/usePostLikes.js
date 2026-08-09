import {useMutation} from "@tanstack/react-query";
import {apiFetch} from "../../lib/api";

function usePostLikes(options) {
    return useMutation({
        mutationFn: async ({id, value, type}) => {
            const form = {
                object_id: id,
                value: value,
                content_type: type,
            };

            const response = await apiFetch("/django/likes/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
            });

            return await response.json();
        },
        ...options,
    });
}

export default usePostLikes;