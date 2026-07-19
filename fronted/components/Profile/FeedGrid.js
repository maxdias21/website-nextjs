import FeedLeft from "./FeedLeft";
import FeedRight from "./FeedRight";

import "./FeedGrid.css";

import useGetMyProfile from "../../hooks/useGetMyProfile";
import useGetFriends from "../../hooks/useGetFriends";
import useGetPhotos from "../../hooks/useGetPhotos";
import React from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";


function FeedGrid() {
    const {data: dataFriends, isLoading: isLoadingFriends} = useGetFriends();
    const {data: dataPhotos, isLoading: isLoadingPhotos} = useGetPhotos();
    const {data: dataPerson, isLoading: isLoadingPerson} = useGetMyProfile();
    const {data: dataPosts, isLoading: isLoadingPosts} = useGetUserPosts();

    if (isLoadingPerson && isLoadingFriends && isLoadingPhotos && isLoadingPosts) return null;

    return (
        <div className="feedGrid">
            <FeedLeft profile={dataPerson} friends={dataFriends} photos={dataPhotos}/>
            <FeedRight posts={dataPosts}/>
        </div>
    );
}

export default FeedGrid;