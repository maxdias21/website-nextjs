"use client";

import styles from "./Modal.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX, faImage} from "@fortawesome/free-solid-svg-icons";

import {useRef, useState} from "react";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";

import {apiFetch} from "../../lib/api";

function Modal({ref, setOpenModal}) {
    const imageRef = useRef(null);
    const textRef = useRef(null);

    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState("");

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const response = await apiFetch("/django/posts/", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (!response.ok) throw new Error(JSON.stringify(result));
            return result;
        },

        onSuccess: () => {
            setText("");
            setImageFile("");
            setImage("");
            if (textRef.current) textRef.current.innerText = "";
            if (imageRef.current) imageRef.current.value = "";
        }
    });

    const disabled = ((text.trim()) && (!mutation.isPending)) && image ? styles.buttonActive : styles.buttonDisabled;

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

        if (imageFile) {
            formData.append("photo", imageFile);
        }

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
                            {Object.entries(JSON.parse(mutation.error.message)).map(([key, value]) => (
                                <p className={styles.error} key={key}>{value[0]}</p>
                            ))}
                        </div>
                    )}
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
                            <button type="submit" className={disabled}>
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