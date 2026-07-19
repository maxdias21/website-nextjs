import styles from './Posts.module.css';
import Post from "./Post";

function Posts({posts}) {
    return (
        <div className={styles.postsContainer}>
            {posts?.length > 0 && posts?.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Posts;