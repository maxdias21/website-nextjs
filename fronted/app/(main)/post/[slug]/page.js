"use client";

import styles from "./page.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import UserInfo from "@/components/ui/UserInfo";
import PostActions from "@/components/ui/PostActions";

import {useParams, useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {apiFetch} from "../../../../lib/api";

function PostDetailPage() {
    const router = useRouter();

    const params = useParams();
    const {data, isLoading, isError} = useQuery(({
        queryKey: ["post"],
        queryFn: async () => {
            const response = await apiFetch(`/django/posts/${params.slug}/`, {method: "GET"});
            return response.json();
        }
    }));

    if (isLoading) return null;

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <header>
                    <FontAwesomeIcon onClick={() => router.back()} className={styles.closeButton} icon={faX}/>
                </header>
                <div className={styles.containerPhoto}>
                    <Image width={200} height={200} src={"https://picsum.photos/800/800"}
                           alt="stories"/>
                </div>
                <div className={styles.containerComments}>
                    <div className={styles.containerCommentsHeader}>
                        <UserInfo showTimestamp={true}/>
                        {data.content}
                    </div>

                    <PostActions/>

                    <div className={styles.commentsContent}>
                        {/* for */}
                        <div className={styles.comments}>
                            <div>
                                <Image width={50} height={50} src={"https://picsum.photos/800/800"}
                                       alt="stories"/>
                            </div>
                            <div className={styles.commentContent}>
                                <div className={styles.name}>Max Dias</div>
                                <div>O comentário é esse</div>
                            </div>
                        </div>
                        {/* end for */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostDetailPage;