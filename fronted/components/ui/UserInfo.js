import styles from "./UserInfo.module.css";

import noPhoto from "../../public/assets/noPhoto.jpg";

import Image from "next/image";

// Uso no ícone da lista de amigos (chat) e no header do post detail
function UserInfo({name, posted, urlImg, showTimestamp = true}) {
    const url = urlImg ? urlImg : noPhoto;

    return (
        <div className={styles.postHeader}>
            <Image unoptimized src={url} alt={"photo"} width={50} height={50}/>
            <div>
                <div>{name}</div>
                {showTimestamp && <span className={styles.postTimestamp}>{posted}</span>}
            </div>
        </div>
    );
}

export default UserInfo;