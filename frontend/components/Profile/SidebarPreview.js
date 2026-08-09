import Link from "next/link";

import styles from "./SidebarPreview.module.css";

function SidebarPreview({title, linkText, href="/", spanText}) {
    return (
        <div className={styles.feedFriends}>
            <div className={styles.friends}>
                <h2>{title}</h2>
                <Link href={href}>{linkText}</Link>
            </div>
            <span>{spanText}</span>
        </div>
    );
}

export default SidebarPreview;