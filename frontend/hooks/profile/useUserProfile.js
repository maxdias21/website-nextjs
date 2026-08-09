import {useQuery} from "@tanstack/react-query";

function useUserProfile() {
    const {data, isLoading} = useQuery({
        queryKey: ["leftPersonDetail"],
        queryFn: async () => {
            const response = await fetch("/django/profiles/me/", {method: "GET"});
            return response.json();
        },
        refetchOnWindowFocus: false,
    });

    return {data, isLoading};
}

export default useUserProfile;