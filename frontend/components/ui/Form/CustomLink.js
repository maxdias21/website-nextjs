import Link from "next/link";

import styles from "./CustomLink.module.css";

function CustomLink({text, link = "/", style}) {
    return (
        <Link style={style} className={styles.formLink} href={link}>{text}</Link>
    );
}

export default CustomLink;