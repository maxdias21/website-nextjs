"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import Card from "../../../components/Friends/Card";
import styles from "./page.module.css";
import {useQuery} from "@tanstack/react-query";
import {apiFetch} from "../../../lib/api";
import useFriendRequestAction from "../../../hooks/friends/useFriendRequestAction";

config.autoAddCss = false;


function Friends() {
    const mutationRemove = useFriendRequestAction({queryKey: "peopleRequestSend"});

    const {data, isPending, isError} = useQuery({
        queryKey: ["peopleRequestSend"],
        queryFn: async () => {
            const response = await apiFetch("/django/sent/pending/", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch suggestions");
            }

            return await response.json();
        }
    });

    if (isPending) return null;

    const isList = data?.length > 0 && !isError;
    const isNotList = data?.length === 0 && !isError


    return (
        <>
            <h1>Solicitações de amizades enviadas</h1>
            <section className={isList ? styles.content : ""}>

                {isList && data?.map((friend) => (
                    <Card
                        key={friend?.id}
                        id={friend?.id}
                        firstName={friend?.first_name}
                        lastName={friend?.last_name}
                        photo={friend?.profiles?.profile_pic}
                        handleRemoveButton={() => mutationRemove.mutate({id: friend?.id, action:"reject"})}
                        showRemoveButton={true}
                        buttonRemoveName={"Remover solicitação"}
                        showAddButton={false}
                    />
                ))}
                {isNotList && (
                    <h3>Não há solicitação de amizade pendente</h3>
                )}
                {isError && (
                    <h3>Houve um erro ao buscar as solicitações enviadas, tente novamente.</h3>
                )}

            </section>

        </>
    );
}

export default Friends;