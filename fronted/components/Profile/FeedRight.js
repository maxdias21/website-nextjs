import "./FeedGrid.css";

import Container from "../Post/Container";
import Posts from "../Post/Posts";
import Post from "../Post/Post";

function FeedRight() {
    return (
        <div className="feedRight">
            <div className="content">
                <Container/>
            </div>

            <Posts>
                <Post/>
            </Posts>
        </div>
    );
}

export default FeedRight;