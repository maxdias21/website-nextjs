import styles from "./FeedLeft.module.css";
import "./FeedGrid.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles, faHouse, faLanguage, faLocationDot, faMars} from "@fortawesome/free-solid-svg-icons";

import SidebarList from "./SidebarList";
import SidebarPreview from "./SidebarPreview";

import Link from "next/link";
import PersonDetails from "./PersonDetails";


function FeedLeft({profile, friends, photos}) {
    const friendsList = {items: friends?.friends?.slice(0, 6), message: "Você não tem nenhum amigo", len: friends?.friends?.length};
    const photosList = {items: photos, message:"Você não possui nenhuma foto" }

    return (
        <div className="feedLeft">
            <div className="content">
                <h2>Detalhes pessoais</h2>
                {profile && (<PersonDetails profile={profile}/>)}

            </div>
            <div className="content">
                <SidebarList url={'/profile/'} items={friendsList.items} noItemsMessage={friendsList.message} >
                    <SidebarPreview title="Amigos" linkText="Veja todos os amigos"
                                    spanText={`${friendsList.len} amigos`}/>
                </SidebarList>
            </div>

            <div className="content">
                <SidebarList url={'profile/photos/'} items={photosList.items} noItemsMessage={photosList.message}>
                    <SidebarPreview title="Fotos" linkText="Veja todos as fotos"/>
                </SidebarList>
            </div>
        </div>
    );
}

export default FeedLeft;