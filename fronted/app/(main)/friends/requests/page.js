'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';
import Card from '../../../../components/Friends/Card';
import styles from '../page.module.css';
import {useQuery} from '@tanstack/react-query';
import {apiFetch} from '../../../../lib/api';
import Cards from '../../../../components/Friends/Cards';

config.autoAddCss = false;


function RequestsPage() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['profiles'],
        queryFn: async () => {
            const response = await apiFetch('/django/friends/request/', {method: 'GET'});
            console.log(response);
            return response.json();
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) return null;


    return (
        <>
            <h1>Solicitações de Amizade</h1>
            <div className={styles.content}>
                <Cards cards={data} />
            </div>

        </>
    );
}

export default RequestsPage;