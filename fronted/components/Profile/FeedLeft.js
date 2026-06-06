import Image from "next/image";

import styles from "./FeedLeft.module.css";
import "./FeedGrid.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles, faHouse, faLanguage, faLocationDot, faMars} from "@fortawesome/free-solid-svg-icons";

import SidebarList from "./SidebarList";
import SidebarPreview from "./SidebarPreview";

const FRIENDS_LIST = [
    {
        photo: "https://picsum.photos/200/300",
        name: "Madasdasdasdasdsadsadsadsadsadasdsadasddsasadasdsadsadasdasdasdasdasdasdsadsax"
    },
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "Max"},

];

const PHOTOS_LIST = [
    {photo: "https://picsum.photos/200/300"},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
    {photo: "https://picsum.photos/200/300",},
];


function FeedLeft() {
    return (
        <div className="feedLeft">
            <div className="content">
                <h2>Detalhes pessoais</h2>
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon} icon={faHouse}/> Mora em São
                    Paulo</p>
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon} icon={faLocationDot}/> De
                    Brasília</p>
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon} icon={faCakeCandles}/> 14 de
                    Abril de 1999</p>
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon} icon={faMars}/> Masculino</p>
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon} icon={faLanguage}/> Inglês e
                    Português</p>
            </div>
            <div className="content">
                <SidebarList items={FRIENDS_LIST}>
                    <SidebarPreview title="Amigos" linkText="Veja todos os amigos" spanText="100 amigos"/>
                </SidebarList>
            </div>

            <div className="content">
                <SidebarList items={PHOTOS_LIST}>
                    <SidebarPreview title="Fotos" linkText="Veja todos as fotos"/>
                </SidebarList>
            </div>
        </div>
    );
}

export default FeedLeft;