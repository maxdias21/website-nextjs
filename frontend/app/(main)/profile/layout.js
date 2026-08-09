import Header from "../../../components/Profile/Header";

import "./page.css";

import React from "react";


function ProfileLayout({children}) {
    return (
        <div className="content__container">
            <Header/>
            <main className="containerFriends">
                {children}
            </main>
        </div>
    );
}

export default ProfileLayout;