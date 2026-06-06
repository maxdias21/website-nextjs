'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';

import {config} from '@fortawesome/fontawesome-svg-core';

import {useQuery} from '@tanstack/react-query';

import styles from './page.module.css';

import {apiFetch} from '../../../lib/api';

import Cards from '../../../components/Friends/Cards';

config.autoAddCss = false;

function Friends() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['profiles'], queryFn: async () => {
            const response = await apiFetch('django/profiles/', {method: 'GET'});
            return response.json();
        },
    });

    if (isLoading) return null;

    return (<>
        <h1>Pessoas que você talvez conheça</h1>
        {error ? <h1>Deu erro</h1> : data.length === 0 ? <h1>Não há amigos disponíveis no momento</h1> : <div className={styles.content}>
            {<Cards cards={data}/>}
        </div>}

    </>);
}

export default Friends;
