import Image from "next/image";

import noPhoto from "@/public/assets/noPhoto.jpg";

import styles from "./Card.module.css";

function Card({firstName, lastName, photo ,showAddButton=true, showRemoveButton, handleAddButton,handleRemoveButton,buttonAddName, buttonRemoveName = "Remover"}) {
    const name = `${firstName} ${lastName}`;

    return (
        <div className={styles.cardContent}>
            <a href=""><Image unoptimized src={photo ? photo : noPhoto} alt={"photo"} width={100}
                              height={900}/></a>
            <footer>
                <a href="">{name}</a>
                {showAddButton && <button onClick={handleAddButton} className={styles.addFriend}>{buttonAddName}</button>}
                {showRemoveButton && <button onClick={handleRemoveButton} className={styles.removeFriend}>{buttonRemoveName}</button>}
            </footer>
        </div>
    );
}

export default Card;