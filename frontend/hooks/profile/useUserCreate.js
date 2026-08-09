import {useMutation} from "@tanstack/react-query";
import {apiFetch} from "../../lib/api";

import {useRouter} from "next/navigation";

function useUserCreate() {
    const router = useRouter()

    return useMutation({
        mutationFn: async ({username, firstName, lastName, email, password, dateOfBirth}) => {
            const response = await apiFetch("/django/create-user/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    date_of_birth: "2001-01-01"
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
        },
        onSuccess() {
            setTimeout(() => {
                router.push("/login");
            }, [5000]);
        },
    });
}

export default useUserCreate;