import "./FeedGrid.css";

import Container from "../Post/Container";
import Posts from "../Post/Posts";

function FeedRight({posts}) {
    return (
        <div className="feedRight">
            <div className="content__container">
                <Container/>
            </div>

            <Posts posts={posts}/>
        </div>
    );
}

export default FeedRight;