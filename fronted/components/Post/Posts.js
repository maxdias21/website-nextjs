import styles from './Posts.module.css';

function Posts({children}) {
    return (
        <div className={styles.postsContainer}>
            {children}
        </div>
    )
}

export default Posts;