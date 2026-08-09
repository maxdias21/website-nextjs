import FriendsContainer from "@/components/FriendsContainer";

import styles from "./shared.module.css";


function AsideContainer() {

    return (
        <aside className={styles.asideContainer}>
            <FriendsContainer />
        </aside>
    );
}

export default AsideContainer;