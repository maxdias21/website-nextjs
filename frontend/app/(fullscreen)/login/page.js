"use client";

import styles from "./page.module.css";

import Image from "next/image";
import {useState} from "react";

import CustomLink from "../../../components/ui/Form/CustomLink";
import ButtonSubmit from "../../../components/ui/Form/ButtonSubmit";
import FormField from "../../../components/ui/Form/FormField";
import Input from "../../../components/ui/Form/Input";
import ButtonNoBackground from "../../../components/ui/Form/ButtonNoBackground";
import useLogin from "../../../hooks/useLogin";

function LoginPage() {
    const [username, setUsername] = useState({name: "username", value: "", placeholder: "Usuário", type: "text"});
    const [password, setPassword] = useState({name: "password", value: "", placeholder: "Senha", type: "password"});

    const fieldsAreValid = username.value?.length > 5 && password.value?.length > 5;

    const mutation = useLogin({username, password,});

    function handleSubmit(e) {
        e.preventDefault();
        mutation.mutate({username: username.value, password: password.value});
    }

    const style = mutation.isPending
        ? {cursor: "not-allowed", opacity: "0.4", pointerEvents: "none"}
        : {};


    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image unoptimized={true} loading={"eager"} fill src={"/assets/wallp1.png"} alt="logo"/>
            </div>
            <div className={styles.logoContainer}>
                <Image unoptimized={true} loading={"eager"} width={50} height={50} src={"/assets/logo.png"} alt="logo"/>
            </div>
            <div className={styles.formContainer}>
                <h3>Entrar no site</h3>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <FormField>
                        <Input
                            value={username.value}
                            onChange={(e) => setUsername({...username, value: e.target.value})}
                            placeholder={username.placeholder}
                            name={username.name}
                            minLength={5}
                            type={username.type}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            value={password.value}
                            onChange={(e) => setPassword({...password, value: e.target.value})}
                            placeholder={password.placeholder}
                            name={password.name}
                            minLength={5}
                            type={password.type}
                        />
                    </FormField>

                    <div className={styles.border}></div>

                    {/* Espaço reservado para o erro — evita que o layout "pule"
                        quando a mensagem aparece ou some */}
                    <div className={styles.error}>
                        {mutation.error && <p>{mutation.error.message}</p>}
                    </div>

                    <div className={styles.loginActions}>
                        {/* Botão desabilitado se campos inválidos OU se está carregando */}
                        <ButtonSubmit
                            isSubmitted={fieldsAreValid && !mutation.isPending}
                            text={mutation.isPending ? "Entrando..." : "Entrar"}
                        />
                        {/* Desabilitado visualmente durante o loading */}
                        <ButtonNoBackground style={style} text="Esqueceu a senha?"/>
                    </div>
                </form>
                {/* Link para cadastro — também desabilitado durante o loading */}
                <CustomLink style={style} link="/register" text="Criar uma nova conta"/>
            </div>
        </div>
    );
}

export default LoginPage;