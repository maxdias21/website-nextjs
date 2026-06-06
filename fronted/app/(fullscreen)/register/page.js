"use client";

import styles from "./register.module.css";

import Form from "../../../components/Register/Form";




function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.textHeader}>
                <h2>Começe a usar o site e participe da nossa comunidade!</h2>
                <p>Crie uma conta para se conectar com amigos, familiares e comunidades de pessoas com os mesmos
                    interesses que você.</p>
            </div>
            <Form />
        </div>
    );
}

export default RegisterPage;