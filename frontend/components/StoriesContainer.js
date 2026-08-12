import styles from "./StoriesContainer.module.css";

import ModalImage from "./ModalImage";

import Image from "next/image";

import {useOpenModal} from "@/hooks/openModal";
import {useRef, useState} from "react";

import noPhoto from "@/public/assets/noPhoto.jpg";

function StoriesContainer({data}) {
    const modalStories = useRef(null);
    const [openModalStories, setOpenModalStories] = useOpenModal({modalStories});
    const [id, setId] = useState(null);

    const orderedData = data?.reduce((acc, post) => {
        const id = post?.author?.id;
        const fullName = `${post?.author?.first_name} ${post?.author?.last_name}`;
        const profile_pic = post?.author?.profiles?.profile_pic || noPhoto;

        if (id === undefined) return acc;

        if (!acc[id]) {
            acc[id] = {
                profile_pic: profile_pic,
                name: fullName,
                posts: []
            };
        }

        acc[id].posts.push(post.image);

        return acc;

    }, {});
    const result = Object.entries(orderedData || []).map(([id, data]) => {
        return {
            id: Number(id),
            name: data.name,
            image: data.image,
            profile_pic: data.profile_pic,
        };
    });
    console.log(id)
    let photos = [];

    return (
        <section className={styles.storiesContainer}>
            {result?.length > 0 && result?.map((story, index) => {
                const author = story?.author?.id;
                const previousAuthor = data[index - 1]?.author?.id;

                if (author !== previousAuthor || index === 0) {
                    photos[author] = [];
                    photos[author].push(story?.image);
                } else {
                    photos[author].push(story?.image);
                    return;
                }
                return (
                    <article onClick={() => {
                        setOpenModalStories(true);
                        setId(() => story.id);
                    }} key={story.id}
                             className={styles.storiesContent}>
                        <div className={styles.storiesPhoto}>

                            <Image unoptimized width={200} height={200} src={story.profile_pic}
                                   alt="stories"/>
                        </div>
                        <Image width={200} height={200} src={"https://picsum.photos/200/300"} alt="stories"/>
                        <div className={styles.storiesName}>{story?.name}</div>
                    </article>
                );
            })}

            {openModalStories && (
                <ModalImage images={result.find(item => item.id === id)} ref={modalStories}
                            setOpenModal={setOpenModalStories}/>)}
        </section>
    );
}

export default StoriesContainer;