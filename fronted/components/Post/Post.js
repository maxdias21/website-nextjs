import styles from "./Post.module.css";

import Image from "next/image";

import {useEffect, useState} from "react";

import Detail from "./Detail";
import UserInfo from "@/components/ui/UserInfo";
import PostActions from "@/components/ui/PostActions";

import Link from "next/link";


function Post({post}) {
    const [openPostModal, setOpenPostModal] = useState(false);

    useEffect(() => {
        if (openPostModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [openPostModal]);

    return (
        <div className={styles.postBody}>
            <UserInfo/>
            <hr/>
            <div className={styles.postContent}>
                <div onClick={() => setOpenPostModal(true)}>
                    <Link href={`/post/${post?.slug}/`}>
                        {post?.image && <Image src={post.img} alt={"photo"} width={500}
                                              height={500}/>}

                        <div className={styles.paragraph}>
                            {post?.content}
                        </div>
                    </Link>
                </div>
                <PostActions setOpenPostModal={setOpenPostModal}/>
            </div>
            {openPostModal && (
                <Detail setOpenPostModal={setOpenPostModal}/>
            )}
        </div>
    );
}

export default Post;