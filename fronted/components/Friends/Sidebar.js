import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faUserPlus, faUserGroup, faHouse, faAngleRight} from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";

import styles from "./Sidebar.module.css";
import Link from "next/link";

function Sidebar() {
    return (
        <>
            <h1>Friends</h1>
            <Link href={"/friends"} className={styles.navItem}>
                <FontAwesomeIcon icon={faHouse}/>
                <p>Menu</p>
                <FontAwesomeIcon className={styles.arrow} icon={faAngleRight}/>
            </Link>
            <Link href={"/friends/requests"} className={styles.navItem}>
                <FontAwesomeIcon icon={faUserPlus}/>
                <p>Solicitações de Amizade</p>
                <FontAwesomeIcon className={styles.arrow} icon={faAngleRight}/>
            </Link>
        </>
    );
}

export default Sidebar;