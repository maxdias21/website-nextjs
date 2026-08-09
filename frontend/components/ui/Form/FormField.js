import styles from "./FormField.module.css";

function FormField({children, errors = []}) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {children}
            </div>
            {errors.length > 0 &&
                errors.map((error, index) => (
                    <p className={styles.error} key={index}>
                        {error}
                    </p>
                ))}
        </div>
    );
}

export default FormField;