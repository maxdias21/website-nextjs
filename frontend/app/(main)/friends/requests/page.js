"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";

import Card from "../../../../components/Friends/Card";

import styles from "../page.module.css";

import useFriendRequestAction from "../../../../hooks/friends/useFriendRequestAction";
import useFriendsListsPending from "../../../../hooks/friends/useFriendsListsPending";

config.autoAddCss = false;


function RequestsPage() {
    const {data, isLoading, isError} = useFriendsListsPending();


    const mutation = useFriendRequestAction({queryKey: "friendsRequests"});

    if (isLoading) return null;

    const friends = data?.length > 0 && !isError;
    const hasNoFriends = data?.length === 0 && !isError;

    return (
        <>
            <h1>Solicitações de Amizade</h1>
            <section className={data?.length ? styles.content : ""}>
                {isError && (
                    <h3>Erro ao buscar dados</h3>
                )}
                {friends && data?.map((friend) => (
                    <Card key={friend.id} id={friend?.id}
                          firstName={friend?.first_name || ""}
                          lastName={friend?.last_name || ""}
                          photo={friend?.profiles?.profile_pic}
                          handleAddButton={() => mutation.mutate({id: friend?.id, action: "accept"})}
                          handleRemoveButton={() => mutation.mutate({id: friend?.id, action: "reject"})}
                          buttonAddName="Aceitar solicitação"
                          buttonRemoveName="Rejeitar solicitação"
                          showRemoveButton={true}/>
                ))}
                {hasNoFriends && (
                    <h3>Você não possui nenhuma solicitação de amizade</h3>
                )}

            </section>

        </>
    );
}

export default RequestsPage;