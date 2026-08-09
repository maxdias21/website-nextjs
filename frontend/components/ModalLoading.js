import styles from "./ModalConfirm.module.css";

import {useEffect} from "react";
import {createPortal} from "react-dom";

function ModalLoading({title, text, closeModal}) {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    });

    const container = document.querySelector('.container')


    return createPortal(
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>{title}</h2>
                <hr/>
                <p>{text}</p>
                <hr/>
                <div className={`${styles.buttons}`}>
                    <button onClick={() => closeModal(false)} className={`${styles.button} ${styles.success}`}>Fechar</button>
                </div>
            </div>
        </div>,
        container
    );
}

export default ModalLoading;