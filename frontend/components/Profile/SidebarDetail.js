import Image from "next/image";

import noPhoto from "../../public/assets/noPhoto.jpg";

import styles from "./SidebarDetail.module.css";
import Link from "next/link";

function SidebarDetail({photoUrl, text, slug, url}) {
    const urlImage = photoUrl ? photoUrl : noPhoto;

    return (
        <div className={styles.content}>
            <Link className={styles.detail} href={`${url}/${slug}/`}>
                <Image src={urlImage} alt={"photo"} width={100}
                       height={100} unoptimized/>
                <p>{text?.slice(0, 100)}</p>
            </Link>
        </div>
    );

}

export default SidebarDetail;