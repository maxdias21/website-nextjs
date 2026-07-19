import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles, faHouse, faLanguage, faLocationDot, faMars} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import styles from './PersonDetails.module.css';

function PersonDetails({profile}) {
    return (
        <>
            {profile.current_state &&
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon}
                                                                  icon={faHouse}/> Mora
                    em {profile.current_state_display}</p>}
            {profile.birth_state &&
                <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon}
                                                                  icon={faLocationDot}/>De {profile.birth_state_display}
                </p>}
            {profile.date_of_birth && (
                <p className={styles.detailItem}>
                    <FontAwesomeIcon className={styles.icon} icon={faCakeCandles}/>
                    {new Date(profile.date_of_birth).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}
                </p>
            )}
            {profile.gender && <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon}
                                                                                 icon={faMars}/> {profile.gender_display}
            </p>}
            <p className={styles.detailItem}><FontAwesomeIcon className={styles.icon} icon={faLanguage}/>Português
            </p>
            <Link className={styles.changeLink} href="/profile/about/"> Clique aqui para alterar suas
                informações pessoais</Link>
        </>
    )
}

export default PersonDetails;