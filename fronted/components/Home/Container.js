import {useState} from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import styles from "./shared.module.css";
import {useQueries} from "@tanstack/react-query";
import {apiFetch} from "../../lib/api";

function Home() {
    // Controla se a sidebar está visível ou escondida
    const [showSidebar, setShowSidebar] = useState(false);

    // Faz duas requisições em paralelo usando React Query
    const results = useQueries({
        queries: [
            {
                queryKey: ["posts"], // chave de cache para os posts
                queryFn: async () => {
                    const response = await apiFetch("/django/posts/", {method: "GET"});
                    return response.json();
                },
                refetchOnWindowFocus: false,
            },
            {
                queryKey: ["users"], // chave de cache para os usuários
                queryFn: async () => {
                    const response = await apiFetch("/django/get-users/", {method: "GET"});
                    return response.json();
                },
                refetchOnWindowFocus: false,
            },
        ]
    });

    // Separa os resultados para facilitar o uso abaixo
    const posts = results[0];
    const users = results[1];

    // Enquanto qualquer uma das requisições estiver carregando, mostra feedback
    if (posts.isLoading || users.isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="content__container">
            {/*
                Aplica um CSS diferente dependendo se a sidebar está visível:
                - container → layout normal com sidebar
                - containerSidebarHidden → layout sem sidebar
            */}
            <div className={showSidebar ? styles.container : styles.containerSidebarHidden}>

                {/* Sidebar recebe a lista de usuários e os controles de visibilidade */}
                <Sidebar
                    users={{data: users.data || [], errors: users.error}}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />

                {/* Conteúdo principal recebe a lista de posts */}
                <MainContainer posts={{data: posts.data || [], error: posts.error}}/>
            </div>
        </div>
    );
}

export default Home;