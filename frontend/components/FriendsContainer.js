import styles from "./FriendsContainer.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

import {useState, useEffect} from "react";

import ChatMessage from "@/components/ChatMessage";
import UserInfo from "@/components/ui/UserInfo";
import useGetFriends from "../hooks/friends/useGetFriends";

function FriendsContainer() {
    const [showContacts, setShowContacts] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const [closeChat, setCloseChat] = useState({
        status: false,
        id: null,
        user: null
    });

    const {data} = useGetFriends();

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
            {data?.friends?.map((friend) => {
                const fullName = `${friend?.first_name} ${friend?.last_name}`;
                const url = friend?.profiles?.profile_pic;

                return (
                    <div key={friend.id}
                         onClick={() => setCloseChat({
                             status: !closeChat.status,
                             id: friend?.id,
                             user: {
                                 firstName: friend?.first_name,
                                 lastName: friend?.last_name,
                                 photo: url,
                             }
                         })}
                         className={`${styles.friendContainer}`}
                         style={{display: windowWidth < 768 ? (!showContacts && "none") : "block"}}>
                        <UserInfo urlImg={url} name={fullName} showTimestamp={false}/>
                    </div>
                );
            })}
            {closeChat.status && <ChatMessage id={closeChat?.id} user={closeChat?.user} closeChat={closeChat} setCloseChat={setCloseChat}/>}
        </div>
    );
}

export default FriendsContainer;