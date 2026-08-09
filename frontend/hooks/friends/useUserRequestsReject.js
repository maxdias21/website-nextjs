import {useMutation} from "@tanstack/react-query";
import {apiFetch} from "../../lib/api";

function useUserRequestsReject (options={}) {
    return useMutation({
        mutationFn: async (id) => {
            const response = await apiFetch("/django/reject/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({to_user_id: id})
            });

            return await response.json();
        },
        ...options,
    });
}

export default useUserRequestsReject;