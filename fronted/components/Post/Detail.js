import styles from "./Detail.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import UserInfo from "@/components/ui/UserInfo";
import PostActions from "@/components/ui/PostActions";

function Detail({setOpenPostModal}) {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <header>
                    <FontAwesomeIcon onClick={() => setOpenPostModal(false)} className={styles.closeButton} icon={faX}/>
                </header>
                <div className={styles.containerPhoto}>
                    <Image width={200} height={200} src={"https://picsum.photos/800/800"}
                           alt="stories"/>
                </div>
                <div className={styles.containerComments}>
                    <UserInfo showTimestamp={true}/>
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

export default Detail;