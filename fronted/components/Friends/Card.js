import Image from 'next/image';

import styles from './Card.module.css';
import Button from './Buttons';
import {useState} from 'react';

function Card({user, card}) {
    const [isLeaving, setIsLeaving] = useState(false);
    const [error, setError] = useState(false);

    let userSender = '';
    if (user?.type === 'sender') {
        userSender = user.user_id.user;
        console.log(userSender);
    }
    if (!user?.id && !user?.type === 'sender') return null;

    const fullName = user?.type === 'sender' ? `${userSender?.first_name} ${userSender?.last_name}` : `${user.first_name} ${user?.last_name}`

    return (
        <div className={`${styles.cardContent} ${isLeaving ? styles.fadeOut : null}`}>
            <a href=""><Image src={'https://picsum.photos/399/300'} alt={'photo'} width={100}
                              height={900}/></a>
            <footer>
                <a href="">{fullName}</a>
                {error && <p className={styles.error}>Erro ao adicionar ou remover solicitação do usuário</p>}
                {user?.id && <Button user_id={user} relationship={card?.relationship} setIsLeaving={setIsLeaving}
                                     setError={setError}/>}

                {user?.type === 'sender' && (
                    <>
                        <Button user_id={user} relationship={card?.relationship} setIsLeaving={setIsLeaving}
                                setError={setError}/>
                    </>

                )}
            </footer>
        </div>
    );
}

export default Card;