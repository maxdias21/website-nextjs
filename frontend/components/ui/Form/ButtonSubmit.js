import styles from "./ButtonSubmit.module.css";

function ButtonSubmit({text="", isSubmitted = false}) {
    return (
        <button
            className={`${styles.button} ${!isSubmitted ? styles.isDisabled : ""}`}
            type="submit"
            disabled={!isSubmitted}
        >{text}</button>
    );
}

export default ButtonSubmit;