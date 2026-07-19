"use client";

import styles from "./page.module.css";

import Image from "next/image";
import Link from "next/link";

import React, {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


import useGetPhotos from "../../../../hooks/useGetPhotos";
import ModalConfirm from "../../../../components/ModalConfirm";

import usePostDeletePhotos from "../../../../hooks/usePostDeletePhotos";
import {useQueryClient} from "@tanstack/react-query";


function PhotosPage() {
    const queryClient = useQueryClient();

    const {data, isLoading} = useGetPhotos();
    const [modal, setModal] = useState(null);
    const [photoId, setPhotoId] = useState(null);
    console.log(data);


    const mutation = usePostDeletePhotos({
        onSuccess: (_, id) => {
            queryClient.setQueryData(["LeftPersonPhotos"], old =>
                old.filter(photo => photo.id !== id));
            setModal(false);
        },
    });

    if (isLoading) return null;


    return (
        <div className="content">
            {data?.length > 0 ?
                <div className={styles.grid}>
                    {data?.map((photo) => (
                        <div key={photo.id} className={styles.imageContent}>
                            <Link href={`/profile/photos/${photo.id}`}
                                  scroll={false}>
                                <Image unoptimized src={photo.photo} width={200} height={200} alt={"photos"}/>
                            </Link>
                            <div onClick={() => {
                                setModal(!modal);
                                setPhotoId(photo?.id);
                            }} className={styles.trashIcon}>
                                <FontAwesomeIcon className={styles.svg} icon={faTrash}/>
                            </div>
                        </div>
                    ))}
                </div>
                : <h3>Você não possui nenhuma foto, que tal postar uma?</h3>}

            {modal && (
                <ModalConfirm
                    error={mutation.isError}
                    title="Remover foto?"
                    isLoading={mutation.isPending}
                    errorMessage={"Erro ao deletar foto"}
                    isLoadingMessage={"Deletando foto..."}
                    text="Você gostaria de apagar essa foto permanentemente?"
                    setModal={setModal} action={() => {
                    mutation.mutate(photoId);
                }}/>
            )}
        </div>
    );

}


export default PhotosPage;