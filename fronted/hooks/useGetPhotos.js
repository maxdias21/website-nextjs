import {useQuery} from "@tanstack/react-query";

function useGetFriends() {
    const {data, isLoading, error, isError} = useQuery({
        queryKey:['LeftPersonPhotos'],
        queryFn: async () => {
            const response = await fetch("/django/photos/", {method: "GET"});
            return response.json();
        }
    });

    return {data,isLoading,  error, isError};
}

export default useGetFriends;