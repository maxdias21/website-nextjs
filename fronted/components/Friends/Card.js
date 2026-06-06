import Image from 'next/image';

import styles from './Card.module.css';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiFetch} from '../../lib/api';

function Card({user, card}) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({user_id}) => {
            const response = await apiFetch(
                `django/friends/request/${user_id}/`,
                {method: 'POST'}
            );
            return response.data;
        },

        onMutate: async ({user_id}) => {
            await queryClient.cancelQueries({queryKey: ['profiles']});

            const previous = queryClient.getQueryData(['profiles']);

            queryClient.setQueryData(['profiles'], (old = []) =>
                old.map((item) =>
                    item.user.id === user_id
                        ? {...item, relationship: 'request_sent'}
                        : item
                )
            );

            return {previous};
        },

        onError: ({context}) => {
            queryClient.setQueryData(['profiles'], context.previous)
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['profiles']});
        }
    });

    const add_friend = card?.relationship === 'none'
        ? <>
            <button className={styles.addFriend} onClick={() => mutation.mutate({user_id: user?.id})}>
                Adicionar amigo
            </button>

        </>
        : null;

    const is_friend = card?.relationship === 'friend'
        ? <button className={styles.addFriend}>
            Já somos amigos :)
        </button>
        : null;

    const is_sent = card?.relationship === 'request_sent' ?
        <button style={{alignItems: 'center'}} className={styles.addFriend}>
            Pedido enviado
        </button>
        : null;

    const is_received = card?.relationship === 'request_received' ?
        <>
            <button style={{justifyContent: 'center'}} className={styles.addFriend}>
                Aceitar solicitação
            </button>
            <button className={styles.removeFriend}>Rejeitar solicitação</button>
        </>
        : null;


    return (
        <div className={styles.cardContent}>
            <a href=""><Image src={'https://picsum.photos/399/300'} alt={'photo'} width={100}
                              height={900}/></a>
            <footer>
                <a href="">{user?.first_name} {user?.last_name}</a>
                {add_friend}
                {is_friend}
                {is_sent}
                {is_received}
            </footer>
        </div>
    );
}

export default Card;