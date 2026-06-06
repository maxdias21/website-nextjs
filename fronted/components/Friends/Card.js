import Image from "next/image";

import styles from "./Card.module.css";

function Card() {
    return (
        <div className={styles.cardContent}>
            <a href=""><Image src={"https://picsum.photos/399/300"} alt={"photo"} width={100}
                              height={900}/></a>
            <footer>
                <a href="">Max Dias</a>
                <button className={styles.addFriend}>Adicionar amigo</button>
                <button className={styles.removeFriend}>Remover</button>
            </footer>
        </div>
    );
}

export default Card;