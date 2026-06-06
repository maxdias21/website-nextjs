import Modal from "./Modal";

import styles from "./Container.module.css";

import Image from "next/image";
import {useOpenModal} from "@/hooks/openModal";
import {useRef} from "react";


function Container() {
    const modal = useRef(null);
    const [openModalPost, setOpenModalPost] = useOpenModal({modal});

    return (
        <div className={styles.postContainer}>
            <Image className="image" width={45} height={45} src="/assets/logo.jpg" alt="logo"/>
            <button className={styles.button} onClick={() => setOpenModalPost(true)}>Sobre o que você está
                pensando?
            </button>
            {openModalPost && (
                <Modal ref={modal} setOpenModal={setOpenModalPost}/>
            )}
        </div>
    )
}

export default Container;