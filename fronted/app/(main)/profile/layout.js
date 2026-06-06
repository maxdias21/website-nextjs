import Header from "../../../components/Profile/Header";

import "./page.css";

import React from "react";


function ProfileLayout({children}) {
    return (
        <div className="content__container">
            <Header/>
            <div className="containerFriends">
                {children}
            </div>
        </div>
    );
}

export default ProfileLayout;