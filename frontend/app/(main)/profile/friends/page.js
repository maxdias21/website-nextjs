"use client";

import React, {useState} from "react";

import styles from "./page.module.css";

import useGetFriends from "../../../../hooks/friends/useGetFriends";
import FilteredFriends from "../../../../components/Friends/FilteredFriends";


function FriendsPage() {
    const [search, setSearch] = useState("");
    const {data, isLoading} = useGetFriends();

    const friends = data?.friends || [];

    const filteredFriends = friends.filter((item) => {
        const value = search.toLowerCase();

        let fullNameNoSpace = `${item?.first_name}${item?.last_name}`.replaceAll(" ", "");
        let fullNameWithSpaces = `${item?.first_name} ${item?.last_name}`;
        return fullNameNoSpace.toLowerCase().includes(value) || fullNameWithSpaces.toLowerCase().includes(value);
    });

    if (isLoading) return null;

    return (
        <div className="content">
            <div className={styles.header}>
                <h3>Todos os amigos</h3>
                <input className={styles.input} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..."/>
            </div>
            <div className={styles.contentInner}>
                <FilteredFriends friends={filteredFriends}/>
            </div>
        </div>
    );
}

export default FriendsPage;