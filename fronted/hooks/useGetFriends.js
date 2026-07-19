import {useQuery} from "@tanstack/react-query";

function useGetFriends() {
    const {data, isLoading} = useQuery({
        queryKey: ["leftFriends"],
        queryFn: async () => {
            const response = await fetch("/django/list/", {method: "GET"});
            return response.json();
        },
        refetchOnWindowFocus: true,
        refetchOnUnmount: true,
    });
    return {data, isLoading}
}

export default useGetFriends;