import styles from "./ButtonNoBackground.module.css"

function ButtonNoBackground({text, style}) {
    return (
        <button style={style} className={`${styles.input}`}>{text}</button>
    );
}

export default ButtonNoBackground;