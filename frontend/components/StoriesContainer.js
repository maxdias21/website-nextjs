import styles from "./StoriesContainer.module.css";

import ModalImage from "./ModalImage";

import Image from "next/image";

import {useOpenModal} from "@/hooks/openModal";
import {useRef, useState, useEffect} from "react";

import mockStories from "@/app/data/mock-stories";

function StoriesContainer() {
    const modalStories = useRef(null);
    const [openModalStories, setOpenModalStories] = useOpenModal({modalStories});

    const [stories, setStories] = useState([]);

    useEffect(() => {
        setStories(mockStories);
    }, []);

    return (
        <section className={styles.storiesContainer}>
            {openModalStories && (
                <ModalImage ref={modalStories} setOpenModal={setOpenModalStories}/>)}
            {stories.map((mock) => (
                <article onClick={() => setOpenModalStories(true)} key={mock.id}
                         className={styles.storiesContent}>
                    <div className={styles.storiesPhoto}>

                        <Image width={200} height={200} src={"https://picsum.photos/200/300"}
                               alt="stories"/>
                    </div>
                    <Image width={200} height={200} src={"https://picsum.photos/200/300"} alt="stories"/>
                    <div className={styles.storiesName}>{mock.name}</div>
                </article>
            ))}
        </section>
    )
}

export default StoriesContainer