import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesRight} from "@fortawesome/free-solid-svg-icons";

import {useState} from "react";

import styles from "./Sidebar.module.css";
import stylesShared from "./Sidebar.module.css";

function Sidebar({showSidebar, setShowSidebar, users}) {
    const [darkTheme, setDarkTheme] = useState(false);
    return (
        <>
            {showSidebar && (
                <main className={`${styles.sidebarContainer} ${stylesShared.sidebarContainer}`}>
                    <div className={styles.sidebarItems}>
                        <div className={styles.sidebarItem}>
                            <label>
                                <input type="checkbox" checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)}/>
                                <div>Tema Escuro</div>
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setShowSidebar(false)}/>
                                <div>Ocultar Menu</div>
                            </label>
                        </div>
                        <div className={styles.sidebarRegisterInfo}>
                            <ul>
                                {!users.errors ?users.data.map((user, index) => {
                                    const date = new Date(user.date_joined).toLocaleDateString("pt-BR");
                                    const time = new Date(user.date_joined).toLocaleTimeString("pt-BR");
                                    const formatted = `${date} às ${time}`;


                                    return (
                                        <li key={index} className={styles.sidebarRegisterItem}><a
                                            href={"/"}>{user.username}</a><span>se registrou {formatted}</span>
                                        </li>
                                    );
                                }) : <h1>Erro ao carregar usuários</h1>}
                            </ul>
                        </div>
                    </div>
                </main>
            )}

            {!showSidebar && (
                <main className={styles.sidebarContainerPositionArrow}>
                    <FontAwesomeIcon
                        className={styles.sidebarArroCustom}
                        icon={faAnglesRight}
                        onClick={() => setShowSidebar(true)}
                    />
                </main>
            )}
        </>
    );
}

export default Sidebar;