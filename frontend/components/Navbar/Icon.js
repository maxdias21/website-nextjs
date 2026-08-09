import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useState} from "react";
import Link from "next/link";

import styles from "./Icon.module.css";



function Icon({icon, title, href}) {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className={styles["navbar__main-area_icons"]}>
            <Link className={styles["icon__a--color--black"]} href={href} rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon}
                                 onMouseEnter={() => setIsHover(true)}
                                 onMouseLeave={() => setIsHover(false)}
                />
            </Link>

            <div
                style={{display: isHover ? "block" : "none"}}
                className={styles["navbar__main-area--icon"]}>{title}
            </div>
        </div>
    );
}

export default Icon;