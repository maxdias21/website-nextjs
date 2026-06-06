import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faX} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

import styles from "./ChatMessage.module.css";

import {useState} from "react";

function ChatMessage({closeChat, setCloseChat}) {

    const [text, setText] = useState("");

    function handleInput(e) {
        setText(e);
    }

    return (
        <section className={styles.chatContainer} style={{display: closeChat ? "flex" : "none"}}>
            <header className={styles.chatHeader}>
                <Image src={"https://picsum.photos/399/300"} alt={"photo"} width={30} height={30}/>
                <p>Max Dias</p>
                <button onClick={() => setCloseChat(!closeChat)}><FontAwesomeIcon icon={faX}/></button>
            </header>
            <hr/>
            <div className={styles.chatBody}>
                <Image src={"https://picsum.photos/399/300"} alt={"photo"} width={80} height={80}/>
                <p>Max Dias</p>
            </div>
            <div className={styles.chatMessageContainer}>
                <div
                    onInput={(e) => handleInput(e.currentTarget.innerText)}
                    contentEditable="plaintext-only"
                    data-placeholder='Diga um "OI" para Max...'
                    className={`${styles.chatMessage} ${!text.trim() ? styles.sayHello : ""}`}
                    style={{height: text.trim() ? "200px" : "70px"}}>
                </div>
                <div className={styles.sendIconContainer}><FontAwesomeIcon className={styles.sendIcon}
                                                                           icon={faPaperPlane}/></div>
            </div>
        </section>
    )
}

export default ChatMessage;