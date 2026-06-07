import styles from './Card.module.css';

import useFriend from '../../hooks/useFriend';

function Button({user_id, relationship, setIsLeaving, setError}) {
    const userId = user_id?.id ? user_id.id : user_id.user_id

    const {mutation} = useFriend();
    const addFriendResponse = {url: `/django/friends/request/${userId}/`, options: {method: 'POST'}};
    const acceptResponse = {url: `/django/friends/accept/${userId}/`, options: {method: 'POST'}, clicked: false};
    const rejectResponse = {url: `/django/friends/reject/${userId}/`, options: {method: 'POST'}, clicked: false};

    function handleClear() {
        setIsLeaving(false);
        setError(false);
    }

    async function handleMutate(payload, animate = false) {
        if (animate) {
            setIsLeaving(true);
            setTimeout(() => mutation.mutate(payload, {
                onError: () => {
                    setIsLeaving(false);
                    setError(true);
                },
                onSuccess: () => {
                    setError(false);
                    setIsLeaving(false);
                }
            }), 400);
        }
    }

    const buttonAddFriend = <button className={styles.addFriend}
                                    onClick={() => {
                                        handleClear();
                                        handleMutate({
                                                user_id: user_id,
                                                relationship: relationship,
                                                url: addFriendResponse.url,
                                                options: addFriendResponse.options
                                            },
                                            true
                                        );
                                    }}>
        Adicionar amigo
    </button>;

    const buttonIsSent = <button style={{alignItems: 'center'}} className={styles.addFriend}>
        Pedido enviado
    </button>;

    const buttonIsReceveid = <>
        <button onClick={() => {
            handleClear();
            handleMutate({
                    user_id: userId,
                    relationship: relationship,
                    url: acceptResponse.url,
                    options: acceptResponse.options
                },
                true
            );
        }} className={styles.addFriend}>
            Aceitar solicitação
        </button>
        <button onClick={() => {
            handleClear();
            handleMutate({
                    user_id: userId,
                    relationship: relationship,
                    url: rejectResponse.url,
                    options: rejectResponse.options
                },
                true
            );
        }}
                className={styles.removeFriend}>{!rejectResponse.clicked ? 'Rejeitar solicitação' : 'Rejeitado'}</button>
    </>







    const addFriend = relationship === 'none'
        ?
        buttonAddFriend
        : null;

    const isSent = relationship === 'request_sent' ?
        buttonIsSent
        : null;

    const isReceveid = relationship === 'request_received' ?
        buttonIsReceveid
        : null;

    const buttonReceiver = <>
        {buttonIsReceveid}
    </>;

    return user_id?.type === 'sender' ? buttonReceiver : (relationship === 'none' ? addFriend
        : relationship === 'friend' ? isFriend
            : relationship === 'request_sent' ? isSent
                : isReceveid);
}

export default Button;