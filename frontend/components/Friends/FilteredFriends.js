import ModalConfirm from "../ModalConfirm";
import {useState} from "react";
import useUserRequestsReject from "../../hooks/friends/useUserRequestsReject";


import noPhoto from "@/public/assets/noPhoto.jpg";

import Image from "next/image";

import styles from "./FilteredFriends.module.css";
import {useQueryClient} from "@tanstack/react-query";

function FilteredFriends({friends}) {
    const [modal, setModal] = useState(null);
    const [friendId, setFriendId] = useState(null);

    const queryClient = useQueryClient();

    const mutation = useUserRequestsReject({
        onSuccess: (_, id) => {
            queryClient.setQueryData(["leftFriends"], old => ({
                ...old,
                friends: old.friends.filter(friend => friend.id !== id),
            }));

            setModal(false);
        }
    });

    return (
        <>
            {friends?.length > 0 ? (
                friends?.map((friend) => {
                        const fullName = `${friend?.first_name} ${friend?.last_name}`.slice(0, 50);
                        const photo = friend?.profiles?.profile_pic;
                        const friendId = friend?.id;


                        return (
                            <div key={friend.id} className={styles.friend}>
                                <Image unoptimized src={photo ? photo : noPhoto} width={100} height={80}
                                       alt="foto amigo"/>
                                <div className={styles.friendsInfo}>
                                    <h3>{fullName}</h3>
                                    <button onClick={() => {
                                        setFriendId(friendId);
                                        setModal(true);
                                    }} className={styles.button}>Remover amigo
                                    </button>
                                </div>
                            </div>
                        );
                    }
                )
            ) : <h3>Você não possui nenhum amigo</h3>}
            {modal && (
                <ModalConfirm
                    error={mutation.isError}
                    title="Remover amigo?"
                    isLoading={mutation.isPending}
                    errorMessage={"Erro ao deletar amigo"}
                    isLoadingMessage={"Deletando amigo..."}
                    text="Você gostaria de apagar da sua lista de amigos permanentemente?"
                    setModal={setModal} action={() => {
                    mutation.mutate(friendId);
                }}/>
            )}
        </>
    );
}

export default FilteredFriends;