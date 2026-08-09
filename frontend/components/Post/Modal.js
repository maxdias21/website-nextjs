"use client";

import styles from "./Modal.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX, faImage} from "@fortawesome/free-solid-svg-icons";

import {useRef, useState} from "react";
import Image from "next/image";

import useUserPostCreate from "../../hooks/posts/useUserPostCreate";
import {useQueryClient} from "@tanstack/react-query";

function Modal({ref, setOpenModal, queryKey='posts'}) {
    const queryClient = useQueryClient();

    const imageRef = useRef(null);
    const textRef = useRef(null);

    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");

    const mutation = useUserPostCreate({
        options: {
            onSuccess: async () => {
                setText("");
                setImageFile("");
                setImage("");
                if (textRef.current) textRef.current.innerText = "";
                if (imageRef.current) imageRef.current.value = "";

                queryClient.invalidateQueries({
                    queryKey: [queryKey],
                });
            }
        }
    });


    const disabled = mutation.isPending;

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    }

    function removeImage() {
        setImage("");
        URL.revokeObjectURL(image);

        if (imageRef.current) {
            imageRef.current.value = "";
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("content", text);

        formData.append("photo", imageFile);

        mutation.mutate(formData);
    }

    return (
        <dialog className={styles.modal} ref={ref} onClose={() => setOpenModal(false)}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}><h3>Criar Post</h3></div>
                    <FontAwesomeIcon
                        className={!mutation.isPending ? styles.modalButtonClose : styles.modalButtonCloseDisabled}
                        onClick={!mutation.isPending ? () => setOpenModal(false) : null}
                        icon={faX}/>
                </div>
                <div>
                    {mutation.isError && (
                        <div>
                            {(() => {
                                try {
                                    const errors = JSON.parse(mutation.error.message);
                                    return Object.entries(errors).map(([key, value]) => (
                                        <p className={styles.error} key={key}>
                                            {value[0]}
                                        </p>
                                    ));
                                } catch {
                                    return <p className={styles.error}>{mutation.error.message}</p>;
                                }
                            })()}
                        </div>
                    )}
                    {mutation.isSuccess && <p className={styles.success}>Post criado com sucesso!</p>}
                </div>
                <hr/>
                <div className={styles.modalBody}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.modalText}>
                            <div
                                ref={textRef}
                                className={!text.trim() ? styles.modalTextDiv : ""}
                                contentEditable="plaintext-only"
                                onInput={(e) => setText(e.currentTarget.innerText)}>
                            </div>
                        </div>
                        {image && (
                            <Image
                                className={styles.previewImage}
                                src={image}
                                width={100}
                                height={100}
                                alt="Image"/>
                        )}
                        <div>
                            <label className={styles.customFile}>
                                <FontAwesomeIcon icon={faImage}/>
                                <input
                                    disabled={disabled}
                                    ref={imageRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={styles.inputHidden}
                                />
                            </label>
                            {image && (
                                <FontAwesomeIcon
                                    onClick={removeImage}
                                    className={styles.customFile}
                                    icon={faX}/>
                            )}
                        </div>
                        <hr/>
                        <div className={styles.modalFooter}>
                            <button disabled={disabled} className={styles.button} type="submit">
                                {mutation.isPending ? "Publicando..." : "Publicar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default Modal;