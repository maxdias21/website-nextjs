import styles from "./UserInfo.module.css";

import Image from "next/image";

// Uso no ícone da lista de amigos (chat) e no header do post detail
function UserInfo({showTimestamp=true}) {
    return (
        <div className={styles.postHeader}>
            <Image src={"https://picsum.photos/399/300"} alt={"photo"} width={50} height={50}/>
            <div>
                <div>Max Dias Vieira Peixoto</div>
                {showTimestamp && <span className={styles.postTimestamp}>10 horas</span>}
            </div>
        </div>
    );
}

export default UserInfo;