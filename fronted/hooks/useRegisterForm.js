import {useEffect, useState} from "react";

const checkEmail = (email) => {
    const regex = /^[a-zA-Z0-9._+]{2,50}@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}/;
    return regex.test(email);
};

const CURRENT_YEAR = new Date().getFullYear();
const generateDays = (daysInMonth) => Array.from({length: daysInMonth}, (_, i) => i + 1);

function useRegisterForm() {
    const [firstName, setFirstName] = useState({name: "firstName", placeholder: "Nome", value: ""});
    const [lastName, setLastName] = useState({name: "lastName", placeholder: "Sobrenome", value: ""});
    const [username, setUsername] = useState({name: "username", placeholder: "Usuário", value: ""});
    const [email, setEmail] = useState({name: "email", placeholder: "Email", value: ""});
    const [password, setPassword] = useState({name: "password", placeholder: "Senha", value: ""});
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [date, setDate] = useState({
        year: CURRENT_YEAR,
        month: "Janeiro",
        days: generateDays(31)
    });


    useEffect(() => {
        const emailValid = checkEmail(email.value);
        setIsEmailValid(emailValid);

        if (firstName.value.length > 2 && lastName.value.length > 2 && emailValid && password.value.length > 8 && username.value.length > 2) {
            setIsSubmitted(true);
        } else {
            setIsSubmitted(false);
        }
    }, [firstName, lastName, email, password, setIsEmailValid, username]);

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
        isEmailValid,
        username,
        setUsername,
        date,
        setDate,
    };
}

export default useRegisterForm;