import styles from "./Post.module.css";

import Image from "next/image";

import {useState} from "react";

import UserInfo from "@/components/ui/UserInfo";
import PostActions from "@/components/ui/PostActions";

import Link from "next/link";

import {formattedData} from "@/utils/utils";
import usePostLikes from "../../hooks/posts/usePostLikes";
import {useQueryClient} from "@tanstack/react-query";


function Post({post, query}) {
    const [, setOpenPostModal] = useState(false);

    const fullName = `${post?.user?.first_name} ${post?.user?.last_name}`.slice(0, 50);
    const profile_pic = post?.user?.profiles?.profile_pic;

    const data = formattedData(post?.creat_at);

    const queryClient = useQueryClient();

    const mutation = usePostLikes({
        onMutate: async (data) => {
            const type = data.value;

            await queryClient.cancelQueries({queryKey: [query]});

            const previousPosts = queryClient.getQueryData([query]);

            queryClient.setQueryData([query], (old) => {
                return (
                    old?.map((post) => {
                        if (type === 1 && post?.id === data.id) {
                            return {
                                ...post,
                                is_liked: !post.is_liked,
                                likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1,
                                dislikes_count: post.is_disliked ? post.dislikes_count - 1 : post.dislikes_count,
                                is_disliked: post.is_liked && (!post.is_disliked && !post.is_liked)
                            };
                        } else if (type === -1 && post?.id === data.id) {
                            return {
                                ...post,
                                is_disliked: !post.is_disliked,
                                dislikes_count: post.is_disliked ? post.dislikes_count - 1 : post.dislikes_count + 1,
                                likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count,
                                is_liked: post.is_disliked && (!post.is_liked && !post.is_disliked)
                            };
                        }
                        return post;
                    })
                );
            });

            return {previousPosts};
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData([query], context.previousPosts);
        },
        onSettled: () => {
            queryClient.invalidateQueries([query])
        }
    });

    return (
        <div className={styles.postBody}>
            <UserInfo posted={data} urlImg={profile_pic} name={fullName}/>
            <hr/>
            <div className={styles.postContent}>
                <div>
                    <Link href={`/post/${post?.slug}/`}>
                        {post?.photo && <Image unoptimized src={post.photo} alt={"photo"} width={500}
                                               height={500}/>}

                        <div className={styles.paragraph}>
                            {post?.content}
                        </div>
                    </Link>
                </div>
                <PostActions mutation={mutation} id={post?.id} isLiked={post?.is_liked} isDisliked={post?.is_disliked}
                             likeCount={post?.likes_count} dislikeCount={post?.dislikes_count}
                             setOpenPostModal={setOpenPostModal}/>
            </div>
        </div>
    );
}

export default Post;