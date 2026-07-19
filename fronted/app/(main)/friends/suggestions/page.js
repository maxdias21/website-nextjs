"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import Card from "../../../../components/Friends/Card";
import styles from "../page.module.css";

config.autoAddCss = false;


function SuggestionsPage() {
    return (
        <>
            <h1>Sugestões de Amizade</h1>
            <section className={styles.content}>
                <Card />
            </section>

        </>
    );
}

export default SuggestionsPage;