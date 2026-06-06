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
            <div className={styles.content}>
                <Card />
            </div>

        </>
    );
}

export default SuggestionsPage;