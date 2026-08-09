import styles from "./PostActions.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

function PostActions({id, likeCount, dislikeCount, isLiked, isDisliked, mutation}) {
    const lenLike = likeCount > 0 && likeCount;
    const lenDislike = dislikeCount > 0 && dislikeCount;
    const likeClass = isLiked ? styles.liked : "";
    const dislikeClass = isDisliked ? styles.disliked : "";


    return (
        <div className={styles.postActions}>
            <div onClick={() => mutation.mutate({id: id, value: 1, type: "posts"})}
                 className={`${styles.svg}`}>
                <FontAwesomeIcon
                    className={`${styles.svg} ${likeClass}`}
                    icon={faThumbsUp}/>{lenLike}</div>
            <div className={styles.action}><FontAwesomeIcon
                onClick={() => mutation.mutate({id: id, value: -1, type: "posts"})}
                className={`${styles.svg} ${dislikeClass}`}
                icon={faThumbsDown}/>{lenDislike}</div>
            <div className={styles.action}><FontAwesomeIcon
                icon={faComment}/>2
            </div>
        </div>
    );
}

export default PostActions;