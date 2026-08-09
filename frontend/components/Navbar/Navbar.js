"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import styles from "./Navbar.module.css";
import {faVideo, faUserGroup, faHouse} from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";
import Link from "next/link";

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className="navbar__container">
            <nav className={styles.navbarContent}>
                <div className={styles.navbarContentItems}>
                    <Link href="/"> <Image className={styles.navbarImage} width={45} height={45} src="/assets/logo.png"
                                                 alt="logo"/></Link>
                    <input className={styles.navbarSearchInput} placeholder="🔍 Pesquisar no site"/>
                </div>
                <div className={styles.navbarMainArea}>
                    <Icon href="/" icon={faHouse} title="Início"/>
                    <Icon href="/friends" icon={faUserGroup} title="Pessoas"/>
                    <Icon href="/video" icon={faVideo} title="Vídeos"/>
                </div>
                <div className={styles.navbarContainerLogoProfile} ref={menuRef}>
                    <button onClick={() => setOpenMenu(prev => !prev)}>
                        <Image className={styles.navbarImage} width={45} height={45} src="/assets/logo.jpg" alt="logo"/>
                    </button>
                    {openMenu &&
                        <div className={`${styles.dialog} ${styles.dialogOpen}`}>
                            <ul>
                                <li>
                                    <Link href="/friends">Amigos</Link>
                                </li>

                                <li>
                                    <Link href="/profile">Perfil</Link>
                                </li>

                                <li>
                                    <Link href="/settings">Configurações</Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
}

export default Navbar;