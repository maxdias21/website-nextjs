import {apiFetch} from "../../lib/api";

import {useQuery} from "@tanstack/react-query";

function usePeopleSuggestionList() {
    return (
        useQuery({
                queryKey: ["friendsSuggestions"],
                queryFn: async () => {
                    const response = await apiFetch("/django/list/people/", {
                        method: "GET",
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch suggestions");
                    }

                    return await response.json();
                }
            }
        ));
}

export default usePeopleSuggestionList;