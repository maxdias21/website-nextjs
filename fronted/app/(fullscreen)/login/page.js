"use client";

import styles from "./page.module.css";

import Image from "next/image";
import {useState} from "react";

import CustomLink from "../../../components/ui/Form/CustomLink";
import ButtonSubmit from "../../../components/ui/Form/ButtonSubmit";
import FormField from "../../../components/ui/Form/FormField";
import Input from "../../../components/ui/Form/Input";
import ButtonNoBackground from "../../../components/ui/Form/ButtonNoBackground";
import {apiFetch} from "../../../lib/api";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

function LoginPage() {
    const router = useRouter();

    // Cada campo guarda suas próprias configurações junto com o valor
    // Assim não precisamos de um useState separado para cada propriedade
    const [username, setUsername] = useState({name: "username", value: "", placeholder: "Usuário", type: "text"});
    const [password, setPassword] = useState({name: "password", value: "", placeholder: "Senha", type: "password"});

    // Só habilita o botão de submit se os dois campos tiverem tamanho mínimo
    const fieldsAreValid = username.value?.length > 5 && password.value?.length > 8;

    const mutation = useMutation({
        // mutationFn recebe um objeto — desestruturamos {username, password} aqui
        mutationFn: async ({username, password}) => {
            const response = await apiFetch("/django/login/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });

            // Se o Django retornar erro (401, 400...), lança exceção
            // O React Query captura e coloca em mutation.error automaticamente
            if (!response.ok) throw new Error("Email ou senha incorretos.");
        },
        // Login ok → navega para home sem recarregar a página
        onSuccess: () => {
            router.push("/");
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        // Dispara a mutationFn com os valores atuais dos campos
        mutation.mutate({username: username.value, password: password.value});
    }

    // Enquanto a requisição está em andamento, desabilita links e botões secundários
    // para evitar que o usuário navegue ou clique em outra coisa
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

                    {/* Campo de usuário */}
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

                    {/* Campo de senha */}
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