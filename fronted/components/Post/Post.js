import styles from "./Post.module.css";

import Image from "next/image";

import {useState} from "react";

import UserInfo from "@/components/ui/UserInfo";
import PostActions from "@/components/ui/PostActions";

import Link from "next/link";

import {formattedData} from "@/utils/utils";


function Post({post}) {
    const [, setOpenPostModal] = useState(false);

    const fullName = `${post?.user?.first_name} ${post?.user?.last_name}`.slice(0,50);
    const profile_pic = post?.user?.profiles?.profile_pic

    const data = formattedData(post?.creat_at);

    return (
        <div className={styles.postBody}>
            <UserInfo posted={data} urlImg={profile_pic} name={fullName} />
            <hr/>
            <div className={styles.postContent}>
                <div >
                    <Link href={`/post/${post?.slug}/`}>
                        {post?.photo && <Image unoptimized src={post.photo} alt={"photo"} width={500}
                                              height={500}/>}

                        <div className={styles.paragraph}>
                            {post?.content}
                        </div>
                    </Link>
                </div>
                <PostActions setOpenPostModal={setOpenPostModal}/>
            </div>
        </div>
    );
}

export default Post;