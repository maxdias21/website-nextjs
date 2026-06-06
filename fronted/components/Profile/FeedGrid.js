import FeedLeft from "./FeedLeft";
import FeedRight from "./FeedRight";

import "./FeedGrid.css";


function FeedGrid() {
    return (
        <div className="feedGrid">
            <FeedLeft/>
            <FeedRight/>
        </div>
    );
}

export default FeedGrid;