import Image from "next/image";

import styles from "./FriendsContainer.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

import {useState, useEffect} from "react";

import ChatMessage from "@/components/ChatMessage";
import UserInfo from "@/components/ui/UserInfo";

function FriendsContainer() {
    const [showContacts, setShowContacts] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [closeChat, setCloseChat] = useState(false);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        function handleSize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleSize);
    }, [windowWidth]);

    function handleClick() {
        setShowContacts(!showContacts);
    }

    return (
        <div className={styles.friendsContainer}>
            <header className={`${styles.contactsHeader}`}>
                <h2 className={styles.contacts}>Contatos</h2>
                <FontAwesomeIcon icon={faArrowDown} onClick={() => handleClick()} className={styles.arrow}/>
            </header>
            <div onClick={() => setCloseChat(!closeChat)} className={`${styles.friendContainer}`}
                 style={{display: windowWidth < 768 ? (!showContacts && "none") : "block"}}>
                <UserInfo showTimestamp={false} />
            </div>
            <ChatMessage closeChat={closeChat} setCloseChat={setCloseChat} />
        </div>
    )
}

export default FriendsContainer;