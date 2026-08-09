import styles from "./ModalConfirm.module.css";
import {useEffect} from "react";

function ModalConfirm({setModal, action, title, text, error, isLoading, errorMessage, isLoadingMessage}) {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    })

    const buttonDisabled = isLoading ? styles.isDisabled : "";

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>{title}</h2>
                <hr />
                <p>{text}</p>
                <hr />
                {error && !isLoading && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
                <div style={{justifyContent: isLoading ? 'center' : 'end'}} className={`${styles.buttons} ${buttonDisabled}`}>
                    {!isLoading ? (
                        <>
                            <button disabled={isLoading} onClick={(prevAction) => setModal(!prevAction)} className={`${styles.button} ${styles.cancel}`}>Não</button>
                            <button disabled={isLoading} onClick={() => {action()}} className={`${styles.button} ${styles.success}`}>Sim</button>
                        </>

                    ) : <p>{isLoadingMessage}</p>}

                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;