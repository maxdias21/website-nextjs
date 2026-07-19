"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import Card from "../../../components/Friends/Card";
import styles from "./page.module.css";

function Friends() {
    return (
        <>
            <h1>Pessoas que você talvez conheça</h1>
            <div className={styles.content}>
                <Card />
            </div>

        </>
    );
}

export default Friends;