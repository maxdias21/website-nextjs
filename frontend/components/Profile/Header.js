"use client";

import styles from "./Header.module.css";
import "../../app/(main)/profile/page.css";

import noPhoto from '@/public/assets/noPhoto.jpg'
import whitePhoto from '@/public/assets/whitePhoto.jpg'

import Image from "next/image";
import Link from "next/link";

import useUserProfile from "../../hooks/profile/useUserProfile";
import useGetFriends from "../../hooks/friends/useGetFriends";
import useUserPhotoPatch from "../../hooks/profile/useUserPhotoPatch";
import ModalLoading from "../ModalLoading";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

function Header() {
    const [modal, setModal] = useState(false);

    const queryProfile = useQueryClient();

    const {data: dataPerson, isLoading: isLoadingPerson} = useUserProfile();
    const {data: dataFriends, isLoading: isLoadingFriends} = useGetFriends();

    const mutation = useUserPhotoPatch({
        onSuccess: (data) => {
            const background_pic = data?.detail?.background_pic;
            const profile_pic = data?.detail?.profile_pic;

            queryProfile.setQueryData(["leftPersonDetail"], (old) => {
                return {
                    ...old,
                    background_pic: background_pic,
                    profile_pic: profile_pic
                };
            });
            setModal(true);
        },
    });

    if (isLoadingPerson && isLoadingFriends) return null;

    const numberFriends = dataFriends?.friends?.length;

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.coverPhoto}>
                    <Image
                        unoptimized
                        src={dataPerson?.background_pic ? dataPerson.background_pic : whitePhoto}
                        alt="photoProfile"
                        width={1000}
                        height={280}
                    />
                </div>

                <input id="file" type="file" hidden onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("background_pic", file);
                    mutation.mutate(formData);
                }}/>

                <input id="profile_pic" type="file" hidden onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("profile_pic", file);
                    mutation.mutate(formData);
                }}/>


                <div className={styles.profileInfo}>
                    <div className={styles.profilePhoto}>
                        <Image
                            unoptimized
                            src={dataPerson?.profile_pic ? dataPerson.profile_pic : noPhoto}
                            alt="photoProfile"
                            width={150}
                            height={150}
                        />
                    </div>

                    <div className={styles.profileName}>
                        <h1>
                            {dataPerson?.user?.first_name} {dataPerson?.user?.last_name}
                        </h1>

                        {numberFriends > 0 && <p>{numberFriends} amigos</p>}
                    </div>
                </div>

                <hr/>

                <div className={styles.profileActions}>
                    <Link href="/profile" scroll={false}>Tudo</Link>
                    <Link href="/profile/about" scroll={false}>Sobre</Link>
                    <Link href="/profile/friends" scroll={false}>Amigos</Link>
                    <Link href="/profile/photos" scroll={false}>Fotos</Link>
                    <label htmlFor="profile_pic">
                        Editar foto perfil
                    </label>
                    <label htmlFor="file">
                        Editar foto capa
                    </label>
                </div>
                {(mutation.isSuccess && modal) && <ModalLoading closeModal={setModal} title="Foto atualizada" text="Sua foto foi atualizada com sucesso!" />}
            </div>
        </header>
    );
}

export default Header;