import {useEffect, useState} from "react";
const checkEmail = (email) => {
    const regex = /^[a-zA-Z0-9._+]{2,50}@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}/;
    return regex.test(email);
};
function useRegisterForm() {
    const [firstName, setFirstName] = useState({name: "firstName", placeholder: "Nome", value: ""});
    const [lastName, setLastName] = useState({name: "lastName", placeholder: "Sobrenome", value: ""});
    const [email, setEmail] = useState({name: "email", placeholder: "Email", value: ""});
    const [password, setPassword] = useState({name: "password", placeholder: "Senha", value: ""});
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setIsEmailValid(checkEmail(email.value));

        if (firstName.value.length > 2 && lastName.value.length > 2 && checkEmail(email.value) && password.value.length > 8) {
            setIsSubmitted(true);
        } else {
            setIsSubmitted(false);
        }
    }, [firstName, lastName, email, password]);

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        isSubmitted,
        isEmailValid
    }
}

export default useRegisterForm;