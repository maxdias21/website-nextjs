import {useQuery} from "@tanstack/react-query";

function useUserPosts() {
    const {data, isLoading} = useQuery({
        queryKey: ["userPosts"],
        queryFn: async () => {
            const response = await fetch("/django/posts/?mine=1", {method: "GET"});
            return response.json();
        },
        refetchOnWindowFocus: false,
    });

    return {data, isLoading};
}

export default useUserPosts;