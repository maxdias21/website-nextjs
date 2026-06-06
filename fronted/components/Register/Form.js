import styles from "./Form.module.css";

import Input from "../ui/Form/Input";
import InputBirthday from "../ui/Form/InputBirthday";
import FormField from "../ui/Form/FormField";
import Label from "../ui/Form/Label";
import ButtonSubmit from "../ui/Form/ButtonSubmit";
import useRegisterForm from "../../hooks/useRegisterForm";
import CustomLink from "../ui/Form/CustomLink";


// Funções utilitárias


function Form() {
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
    } = useRegisterForm();


    return (
        <form className={styles.formContainer}>
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
            <InputBirthday/>
            <FormField errors={!isEmailValid && ["Email inválido"]}>
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
    );
}

export default Form;