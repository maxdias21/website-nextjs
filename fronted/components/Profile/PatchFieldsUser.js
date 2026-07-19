import styles from "./PatchFields.module.css";

function PatchFieldsProfile({isLoading, isError, isSuccess, blankForm}) {
    return (
        <>
            <input className={styles.input} disabled={isLoading} name="first_name" placeholder="Nome"/>
            <input className={styles.input} disabled={isLoading} name="last_name" placeholder="Sobrenome"/>

            <div className={styles.field}>
                <input
                    className={styles.input}
                    disabled={isLoading}
                    type="password"
                    name="password"
                    placeholder="Senha"
                />

                {isError && (
                    <>
                        <hr className={styles.hr}/>
                        {isError}
                    </>
                )}

                {blankForm}
                {isSuccess}
            </div>
        </>
    );
}

export default PatchFieldsProfile;