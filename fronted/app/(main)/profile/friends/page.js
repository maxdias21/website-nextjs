"use client";

import Image from "next/image";

import styles from "./page.module.css";

import React, {useState} from "react";

const FRIENDS_LIST = [
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "João"},
    {photo: "https://picsum.photos/200/300", name: "Maria"},
    {photo: "https://picsum.photos/200/300", name: "Pedro"},
    {photo: "https://picsum.photos/200/300", name: "Lucas"},
    {photo: "https://picsum.photos/200/300", name: "Ana"},
    {photo: "https://picsum.photos/200/300", name: "Carlos"},
    {photo: "https://picsum.photos/200/300", name: "Fernanda"},
    {photo: "https://picsum.photos/200/300", name: "Julia"},
    {photo: "https://picsum.photos/200/300", name: "Rafael"},
    {photo: "https://picsum.photos/200/300", name: "Gabriel"},
    {photo: "https://picsum.photos/200/300", name: "Matheus"},
    {photo: "https://picsum.photos/200/300", name: "Larissa"},
    {photo: "https://picsum.photos/200/300", name: "Bruno"},
    {photo: "https://picsum.photos/200/300", name: "Camila"},
    {photo: "https://picsum.photos/200/300", name: "Ricardo"},
    {photo: "https://picsum.photos/200/300", name: "Patricia"},
    {photo: "https://picsum.photos/200/300", name: "Vinicius"},
    {photo: "https://picsum.photos/200/300", name: "Amanda"},
    {photo: "https://picsum.photos/200/300", name: "Thiago"},
    {photo: "https://picsum.photos/200/300", name: "Eduardo"},
    {photo: "https://picsum.photos/200/300", name: "Beatriz"},
    {photo: "https://picsum.photos/200/300", name: "Gustavo"},
    {photo: "https://picsum.photos/200/300", name: "Isabela"},
    {photo: "https://picsum.photos/200/300", name: "Leonardo"},
    {photo: "https://picsum.photos/200/300", name: "Felipe"},
    {photo: "https://picsum.photos/200/300", name: "Natália"},
    {photo: "https://picsum.photos/200/300", name: "Daniel"},
    {photo: "https://picsum.photos/200/300", name: "Sofia"},
    {photo: "https://picsum.photos/200/300", name: "Henrique"},
];


function FriendsPage() {
    const [friends] = useState(FRIENDS_LIST);
    const [filteredFriends, setFilteredFriends] = useState(friends);

    function handleSearch(e) {
        const value = e.target.value.toLowerCase();

        const filtered = friends.filter((item) => item.name.toLowerCase().includes(value));

        setFilteredFriends(filtered);
    }

    return (
        <div className="content">
            <div className={styles.header}>
                <h3>Todos os amigos</h3>
                <input onChange={(e) => handleSearch(e)} placeholder="Buscar..."/>
            </div>
            <div className={styles.content}>
                {filteredFriends.map((friend, index) => (
                    <div key={index} className={styles.friend}>
                        <Image src={friend.photo} width={100} height={80} alt="foto amigo"/>
                        <div className={styles.friendsInfo}>
                            <h3>{friend.name}</h3>
                            <button>Remover amigo</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default FriendsPage;