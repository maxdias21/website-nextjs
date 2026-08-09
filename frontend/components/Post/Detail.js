import styles from "./Detail.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";

import UserInfo from "@/components/ui/UserInfo";
import PostActions from "@/components/ui/PostActions";

import usePostLikes from "../../hooks/posts/usePostLikes";
import {useState} from "react";
import ModalLoading from "../ModalLoading";


function Detail({image, name, posted, id, likeCount, dislikeCount, isLiked, isDisliked}) {
    const router = useRouter();
    const [isError, setIsError] = useState(false);

    const queryClient = useQueryClient();

    const mutation = usePostLikes({
        onMutate: async (data) => {
            const type = data.value;

            await queryClient.cancelQueries({queryKey: ["post"]});

            const previousPosts = queryClient.getQueryData(["post"]);

            queryClient.setQueryData(["post"], (old) => {
                if (!old) return old;

                if (type === 1) {
                    return {
                        ...old,
                        is_liked: !old.is_liked,
                        likes_count: old.is_liked ? old.likes_count - 1 : old.likes_count + 1,
                        dislikes_count: old.is_disliked ? old.dislikes_count - 1 : old.dislikes_count,
                        is_disliked: old.is_liked && (!old.is_disliked && !old.is_liked)
                    };
                } else if (type === -1) {
                    return {
                        ...old,
                        is_disliked: !old.is_disliked,
                        dislikes_count: old.is_disliked ? old.dislikes_count - 1 : old.dislikes_count + 1,
                        likes_count: old.is_liked ? old.likes_count - 1 : old.likes_count,
                        is_liked: old.is_disliked && (!old.is_liked && !old.is_disliked)
                    };
                }

                return old;
            });

            return {previousPosts};
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(["post"], context.previousPosts);
            setIsError(true);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["post"]});
        }
    });


    return (
        <section className={styles.container}>
            {isError && (
                <ModalLoading title={"Erro ao curtir o post"} text={"Tente novamente"} closeModal={setIsError} />
            )}
            <div className={styles.content}>
                <header>
                    <FontAwesomeIcon onClick={() => router.back()} className={styles.closeButton} icon={faX}/>
                </header>
                <div className={styles.containerPhoto}>
                    {image && <Image width={200} height={200} src={image}
                                     unoptimized alt="stories"/>}
                </div>
                <div className={styles.containerComments}>
                    <UserInfo posted={posted} name={name} showTimestamp={true}/>
                    <PostActions mutation={mutation} id={id} likeCount={likeCount} dislikeCount={dislikeCount}
                                 isLiked={isLiked} isDisliked={isDisliked}/>
                    <hr/>
                    <div className={styles.commentsContent}>
                        {/* for */}
                        <div className={styles.comments}>
                            <div>
                                <Image width={50} height={50} src={"https://picsum.photos/800/800"}
                                       alt="stories"/>
                            </div>
                            <div className={styles.commentContent}>
                                <div className={styles.name}>Max Dias</div>
                                <div>O comentário é</div>
                            </div>
                        </div>
                        {/* end for */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Detail;