"use client";

import styles from "./register.module.css";

import Form from "../../../components/Register/Form";
import Text from "../../../components/Register/Text";




function RegisterPage() {
    return (
        <div className={styles.container}>
            <Text />
            <Form />
        </div>
    );
}

export default RegisterPage;