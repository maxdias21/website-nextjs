import styles from './Posts.module.css';
import Post from "./Post";

function Posts({posts, query}) {
    return (
        <div className={styles.postsContainer}>
            {posts?.length > 0 && posts?.map(post => (
                <Post query={query} key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Posts;