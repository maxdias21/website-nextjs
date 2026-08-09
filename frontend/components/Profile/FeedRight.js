import "./FeedGrid.css";

import Container from "../Post/Container";
import Posts from "../Post/Posts";
import useUserPosts from "../../hooks/posts/useUserPosts";

function FeedRight() {
    const {data, isLoading} = useUserPosts();

    if(isLoading) return null;

    return (
        <div className="feedRight">
            <div className="content__container">
                <Container/>
            </div>

            <Posts query={'userPosts'} posts={data}/>
        </div>
    );
}

export default FeedRight;