import styles from "./PostActions.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

function PostActions({setOpenPostModal}) {
    return (
        <div className={styles.postActions}>
            <div className={styles.action}><FontAwesomeIcon icon={faThumbsUp}/> 1</div>
            <div onClick={() => setOpenPostModal(prev => !prev)} className={styles.action}><FontAwesomeIcon
                icon={faComment}/>2
            </div>
        </div>
    );
}

export default PostActions;