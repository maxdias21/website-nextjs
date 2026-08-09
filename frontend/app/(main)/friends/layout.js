import styles from "./page.module.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {config} from "@fortawesome/fontawesome-svg-core";

import Sidebar from "../../../components/Friends/Sidebar";

config.autoAddCss = false;


function FriendsLayout({children}) {
    return (
        <div className="content__container">
            <section className={styles.layout}>
                <aside className={styles.sidebar}>
                    <Sidebar/>
                </aside>
                <main className={styles.container}>
                    {children}
                </main>
            </section>
        </div>

    );
}

export default FriendsLayout;