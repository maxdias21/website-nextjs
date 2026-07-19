"use client";

import styles from "./Header.module.css";
import "../../app/(main)/profile/page.css";

import Image from "next/image";
import Link from "next/link";
import useGetMyProfile from "../../hooks/useGetMyProfile";
import useGetFriends from "../../hooks/useGetFriends";

function Header() {
    const {data: dataPerson, isLoading: isLoadingPerson} = useGetMyProfile();
    const {data: dataFriends, isLoading: isLoadingFriends} = useGetFriends();

    if(isLoadingPerson && isLoadingFriends) return null;

    const numberFriends = dataFriends?.friends?.length;

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.coverPhoto}>
                    <Image src={"https://picsum.photos/399/300"} alt={"photo"} width={1000} height={400}/>
                    <input id="file" type="file" hidden/>
                    <label htmlFor="file">
                        Editar foto
                    </label>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.profilePhoto}>
                        <Image src={"https://picsum.photos/399/300"} alt={"photoProfile"} width={150}
                               height={150}/>
                    </div>
                    <div className={styles.profileName}>
                        <h1>{dataPerson?.user?.first_name} {dataPerson?.user?.last_name}</h1>
                        {numberFriends > 0 && <p>{numberFriends} amigos</p>}
                    </div>
                </div>
                <hr/>
                <div className={styles.profileActions}>
                    <Link href="/profile" scroll={false}>Tudo</Link>
                    <Link href="/profile/about" scroll={false}>Sobre</Link>
                    <Link href="/profile/friends" scroll={false}>Amigos</Link>
                    <Link href="/profile/photos" scroll={false}>Fotos</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;