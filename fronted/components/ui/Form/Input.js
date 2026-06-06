import styles from "./Input.module.css";

function Input({
                   name = "",
                   value = "",
                   placeholder,
                   onChange,
                   errors,
                   /* Se true, caso o campo não seja válido, ele mostra uma borda vermelha com uma animação */
                   enableValidation = true,
                   minLength = 6,
                   type = "text",
               }) {
    const handleFocus = (e) => e.target.classList.remove(styles.eventInvalid);
    const handleBlur = (e) => e.target.classList.add(styles.eventInvalid);

    return (
        <input
            id={name}
            className={styles.field}
            value={value}
            onChange={onChange}
            onFocus={(enableValidation && handleFocus) || errors && handleFocus}
            onBlur={(enableValidation && value.length < minLength ? handleBlur : undefined) || errors && handleBlur}
            placeholder={placeholder}
            type={type}
        />
    );
}

export default Input;