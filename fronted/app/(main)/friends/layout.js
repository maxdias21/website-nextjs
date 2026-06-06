"use client";

import styles from "./page.module.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import Sidebar from "../../../components/Friends/Sidebar";

config.autoAddCss = false;


function FriendsLayout({children}) {
    return (
        <div className="content__container">
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>

    );
}

export default FriendsLayout;