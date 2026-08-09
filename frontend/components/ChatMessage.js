import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faX} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

import styles from "./ChatMessage.module.css";

import React, {useEffect, useRef} from "react";

import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiFetch} from "../lib/api";

function ChatMessage({id, user, closeChat, setCloseChat}) {
    const queryClient = useQueryClient();

    const [text, setText] = useState("");
    const textRef = useRef(null);
    const chatRef = useRef(null);

    const {data, isLoading} = useQuery({
        queryKey: ["chatMessage"],
        queryFn: async () => {
            const response = await apiFetch(`/django/chats/${id}/`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(response);
            }

            return await response.json();
        },
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        onMutate: async () => {
            const newMessage = {
                chat: chat_id,
                content: text,
                sender: current_id,
            };

            await queryClient.cancelQueries({queryKey: ["chatMessage"]});

            const previousMessages = queryClient.getQueryData(["chatMessage"]);

            queryClient.setQueryData(["chatMessage"], (old) => {
                newMessage.created_at = new Date().toISOString();

                return {
                    ...old,
                    messages: [
                        ...old.messages,
                        newMessage
                    ]
                };
            });

            return {previousMessages};
        },
        mutationFn: async (to_user) => {
            const response = await apiFetch(`/django/chats/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    to_user: to_user,
                    content: text
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            return data;
        },
        onSuccess: () => {
            setText("");
            textRef.current.innerText = "";
            queryClient.invalidateQueries({queryKey: ["chatMessage"]});
        },
        onError: (error, variables, context,) => {
            queryClient.setQueryData(["chatMessage"], context.previousMessages);
        },
    });


    function handleInput(e) {
        setText(e);
    }

    const fullName = `${user?.firstName} ${user?.lastName}`;
    const photo = user?.photo ? user.photo : "/assets/noPhoto.jpg";

    const current_id = data?.current_id;
    const chat_id = data?.id;

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [data?.messages]);

    return (
        <section className={styles.chatContainer} style={{display: closeChat ? "flex" : "none"}}>
            <header className={styles.chatHeader}>
                <Image unoptimized src={photo} alt={"photo"} width={30} height={30}/>
                <p>{fullName}</p>
                <button onClick={() => setCloseChat(false)}><FontAwesomeIcon icon={faX}/></button>
            </header>
            <hr/>
            <div className={styles.chatBody}>
                <Image unoptimized src={photo} alt={"photo"} width={80} height={80}/>
                <p>{fullName}</p>
            </div>
            <div
                className={styles.chatHistory}
                ref={chatRef}
            >
                {isLoading ? <p className={styles.isLoadingChat}>Carregando conversas...</p> :
                    <>
                        {/*  INICIO FOR */}
                        {data?.messages && data.messages.map((chat, index) => {
                                const idUser = data?.current_id;

                                const currentDay = new Date(chat.created_at).toLocaleDateString("pt-BR");
                                const previousDay = index > 0 ?
                                    new Date(data.messages[index - 1].created_at).toLocaleDateString("pt-BR")
                                    : null;

                                return (
                                    <React.Fragment key={index}>
                                        {currentDay !== previousDay &&
                                            < div className={styles.formattedData}>{currentDay}</div>}
                                        {chat.sender === idUser ? (
                                            <div className={styles.userMessage}>
                                                {chat.content}
                                            </div>
                                        ) : (
                                            <div className={styles.friendMessage}>
                                                {chat.content}
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            }
                        )
                        }
                    </>
                }
                {/*  FIM FOR */}
                {mutation.isError &&
                    <div className={styles.sendErrorMessage}>
                        <p className={styles.messageError}>Erro ao enviar a mensagem</p>
                        <button className={styles.button} onClick={() => mutation.mutate(id)}>Clique aqui para enviar
                            novamente
                        </button>
                    </div>

                }
            </div>
            <div className={styles.chatMessageContainer}>
                <div
                    ref={textRef}
                    onInput={(e) => handleInput(e.currentTarget.innerText)}
                    contentEditable="plaintext-only"
                    data-placeholder={`Diga um "OI" para ${user?.firstName}...`}
                    className={`${styles.chatMessage} ${!text.trim() ? styles.sayHello : ""}`}
                    style={{height: text.trim() ? "200px" : "70px"}}>
                </div>
                <button
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate(id)}
                    className={`${styles.sendIconContainer}`}>
                    <FontAwesomeIcon
                        className={`${styles.sendIcon} ${mutation.isPending ? styles.buttonPending : ""}`}
                        icon={faPaperPlane}/>
                </button>
            </div>
            ;
        </section>
    )
        ;
}

export default ChatMessage;