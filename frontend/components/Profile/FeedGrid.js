import FeedLeft from "./FeedLeft";
import FeedRight from "./FeedRight";

import "./FeedGrid.css";

import useUserProfile from "../../hooks/profile/useUserProfile";
import useGetFriends from "../../hooks/friends/useGetFriends";
import useGetPhotos from "../../hooks/photos/useGetPhotos";
import React from "react";


function FeedGrid() {
    const {data: dataFriends, isLoading: isLoadingFriends} = useGetFriends();
    const {data: dataPhotos, isLoading: isLoadingPhotos} = useGetPhotos();
    const {data: dataPerson, isLoading: isLoadingPerson} = useUserProfile();


    if (isLoadingPerson && isLoadingFriends && isLoadingPhotos) return null;

    return (
        <div className="feedGrid">
            <FeedLeft profile={dataPerson} friends={dataFriends} photos={dataPhotos}/>
            <FeedRight/>
        </div>
    );
}

export default FeedGrid;