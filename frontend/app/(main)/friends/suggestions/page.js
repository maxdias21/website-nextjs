"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import Card from "../../../../components/Friends/Card";

import styles from "../page.module.css";

import usePeopleSendRequest from "../../../../hooks/friends/usePeopleSendRequest";
import usePeopleSuggestionList from "../../../../hooks/friends/usePeopleSuggestionList";

config.autoAddCss = false;


function SuggestionsPage() {
    const mutation = usePeopleSendRequest();
    const {data, isPending} = usePeopleSuggestionList();

    if (isPending) return null;

    const isNotNull = data?.length > 0;

    return (
        <>
            <h1>Sugestões de Amizade</h1>
            <section className={isNotNull ? styles.content : ""}>

                {isNotNull && data?.length > 0 && data.map((friend) => (
                    <Card
                        key={friend?.id}
                        id={friend?.id}
                        firstName={friend?.first_name}
                        lastName={friend?.last_name}
                        photo={friend?.profiles?.profile_pic}
                        handleAddButton={() => mutation.mutate({id: friend?.id})}
                        buttonAddName="Enviar solicitação"
                    />
                ))}
                {!isNotNull && (
                    <h3>Não encontramos sugestões de amizades no momento</h3>
                )}

            </section>

        </>
    );
}

export default SuggestionsPage;