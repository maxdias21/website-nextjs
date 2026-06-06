import Image from "next/image";

import styles from "./SidebarDetail.module.css";
import Link from "next/link";

function SidebarDetail({photoUrl, text}) {
    return (
        <div className={styles.detail}>
            <Link href="/public">
                <Image src={photoUrl} alt={"photo"} width={100}
                       height={100}/>
                <span>{text}</span>
            </Link>
        </div>
    );

}

export default SidebarDetail;