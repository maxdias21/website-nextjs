import styles from "./Form.module.css";

import Input from "../ui/Form/Input";
import InputBirthday from "../ui/Form/InputBirthday";
import FormField from "../ui/Form/FormField";
import Label from "../ui/Form/Label";
import ButtonSubmit from "../ui/Form/ButtonSubmit";
import useRegisterForm from "../../hooks/profile/useRegisterForm";
import CustomLink from "../ui/Form/CustomLink";
import useUserCreate from "../../hooks/profile/useUserCreate";


function Form() {
    const mutation = useUserCreate();

    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        isEmailValid,
        setEmail,
        password,
        setPassword,
        isSubmitted,
        username,
        setUsername,
        date,
        setDate
    } = useRegisterForm();

    function handleSubmit(event) {
        event.preventDefault();
        mutation.mutate({
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            dateOfBirth: date
        });
    }


    return (
        <>
            {mutation.isSuccess &&
                <div className={styles.success}>Sucesso ao criar sua conta, você será redirecionado para a página de
                    login</div>}
            {mutation.isError && (
                <div className={styles.error}>
                    {Object.entries(mutation.error).map(([, errors]) => (

                        errors.map((error, index) => (
                                <p key={index}>
                                    {error}
                                </p>
                            )
                        )))}
                </div>
            )}

            <form onSubmit={handleSubmit}
                  className={`${styles.formContainer} ${mutation.isPending || mutation.isSuccess && styles.isPending}`}>
                <div className={styles.nameGroup}>
                    <div className={styles.nameForm}>
                        <FormField>
                            <Label isBold={true} name={firstName.name} placeholder={firstName.placeholder}></Label>
                            <Input
                                name={firstName.name}
                                placeholder={firstName.placeholder}
                                onChange={(e) => setFirstName((prevState) => ({...prevState, value: e.target.value}))}
                                value={firstName.value}
                                minLength={2}
                            />
                        </FormField>

                        <FormField>
                            <Label isBold={true} name={lastName.name} placeholder={lastName.placeholder}></Label>
                            <Input
                                name={lastName.name}
                                placeholder={lastName.placeholder}
                                onChange={(e) => setLastName((prevState) => ({...prevState, value: e.target.value}))}
                                value={lastName.value}
                                minLength={2}
                            />
                        </FormField>
                    </div>
                </div>
                <InputBirthday date={date} setDate={setDate}/>
                <FormField>
                    <Label isBold={true} name={username.name} placeholder={username.placeholder}></Label>
                    <Input
                        errors={!username}
                        name={username.name}
                        placeholder={username.placeholder}
                        onChange={(e) => setUsername((prevState) => ({...prevState, value: e.target.value}))}
                        value={username.value}
                    />
                </FormField>
                <FormField errors={!isEmailValid && email.value.length > 0 && ["Email inválido"]}>
                    <Label isBold={true} name={email.name} placeholder={email.placeholder}></Label>
                    <Input
                        errors={!isEmailValid}
                        name={email.name}
                        placeholder={email.placeholder}
                        onChange={(e) => setEmail((prevState) => ({...prevState, value: e.target.value}))}
                        value={email.value}
                        type="email"
                    />
                </FormField>
                <FormField>
                    <Label isBold={true} name={password.name} placeholder={password.placeholder}></Label>
                    <Input
                        name={password.name}
                        placeholder={password.placeholder}
                        onChange={(e) => setPassword((prevState) => ({...prevState, value: e.target.value}))}
                        value={password.value}
                        minLength={2}
                        type="password"
                    />
                </FormField>
                <div>
                    <ButtonSubmit isSubmitted={isSubmitted} text="Criar conta"/>
                </div>
                <CustomLink text="Eu já tenho uma conta" link="/login"/>
            </form>
        </>

    );
}

export default Form;