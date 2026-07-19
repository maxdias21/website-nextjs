import {useMutation} from "@tanstack/react-query";

import {useRouter} from "next/navigation";

function usePostLogin() {
    const router = useRouter();

    return useMutation({
        // mutationFn recebe um objeto — desestruturamos {username, password} aqui
        mutationFn: async ({username, password}) => {
            const response = await fetch("/django/login/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });


            // Se o Django retornar erro (401, 400...), lança exceção
            // O React Query captura e coloca em mutation.error automaticamente
            if (!response?.ok) throw new Error("Email ou senha incorretos.");
        },
        // Login ok → navega para home sem recarregar a página
        onSuccess: () => {
            router.push("/");
        },
    });
}

export default usePostLogin;