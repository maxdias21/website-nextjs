import {useQuery} from "@tanstack/react-query";

import {apiFetch} from "../../lib/api";

function useFriendRequestAction() {
    return (
        useQuery({
                queryKey: ["friendsRequests"],
                queryFn: async () => {
                    const response = await apiFetch("/django/list/pending/", {
                        method: "GET",
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch requests");
                    }

                    return await response.json();
                }
            }
        )
    );
}

export default useFriendRequestAction;