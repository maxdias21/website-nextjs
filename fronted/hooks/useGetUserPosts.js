import {useQuery} from "@tanstack/react-query";

function useGetUserPosts() {
    const {data, isLoading} = useQuery({
        queryKey: ["userPosts"],
        queryFn: async () => {
            const response = await fetch("/django/posts/", {method: "GET"});
            return response.json();
        },
        refetchOnWindowFocus: false,
    });

    return {data, isLoading};
}

export default useGetUserPosts;