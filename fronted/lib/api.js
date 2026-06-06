export async function apiFetch(url, options) {
    let response;
    try {
        response = await fetch(url, options);

        if (response.status === 401) {
            const refreshed = await fetch("/django/refresh/", { method: "POST" });

            if (!refreshed.ok) {
                window.location.href = "/login";
                return null;
            }

            response = await fetch(url, options);
        }

    } catch  {
        // ERR_CONNECTION_RESET — tenta refresh e repete
        try {
            const refreshed = await fetch("/django/refresh/", { method: "POST" });

            if (!refreshed.ok) {
                window.location.href = "/login";
                return null;
            }

            response = await fetch(url, options); // 👈 repete a requisição original
        } catch (refreshError) {
            window.location.href = "/login";
            return null;
        }
    }

    return response;
}