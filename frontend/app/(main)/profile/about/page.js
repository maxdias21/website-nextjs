"use client";

import styles from "./page.module.css";

import {useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRepeat} from "@fortawesome/free-solid-svg-icons";

import useProfilePatch from "../../../../hooks/profile/useProfilePatch";
import useUserPatch from "../../../../hooks/profile/useUserPatch";
import PatchFieldsProfile from "../../../../components/Profile/PatchFieldsProfile";
import PatchFieldsUser from "../../../../components/Profile/PatchFieldsUser";

function AboutPage() {
    const [changeForm, setChangeForm] = useState(true);
    const [blankForm, setBlankForm] = useState(false);

    const CustomTag = "h3";
    const titleEditDetails = changeForm ? <CustomTag>Editar detalhes</CustomTag> :
        <CustomTag>Editar informações pessoais</CustomTag>;

    const mutationProfile = useProfilePatch();
    const mutationUser = useUserPatch();

    const isLoading = mutationUser.isPending || mutationProfile.isPending;

    const profileError = mutationProfile?.error && Object.entries(mutationProfile?.error || {}).map(([key, value]) => (
        <p className={styles.error} key={key}>
            {value}
        </p>
    ));
    const profileSuccess = mutationProfile.isSuccess && (
        <p className={styles.success}>Alterações realizadas com sucesso</p>
    );

    const userError = mutationUser?.error && Object.entries(mutationUser?.error || {}).map(([key, value]) => (
        <p className={styles.error} key={key}>
            {value}
        </p>
    ));
    const userSuccess = mutationUser.isSuccess && (
        <p className={styles.success}>Alterações realizadas com sucesso</p>
    );
    const userErrorBlankForm = blankForm && (
        <p className={styles.warning}>Você não fez nenhuma alteração na sua conta</p>
    );


    function handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(
            new FormData(e.target).entries()
        );

        let filteredData = {};
        filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value.trim() !== ""));

        if (Object.keys(filteredData).length <= 0) {
            setBlankForm(true);
            return;
        }

        if (changeForm) {
            mutationProfile.mutate(filteredData);
        } else {
            mutationUser.mutate(filteredData);
        }
        setBlankForm(false);
    }


    return (
        <div className="content">
            <div className={styles.detailsHeader}>
                {titleEditDetails}
                <FontAwesomeIcon onClick={() => {
                    setChangeForm(!changeForm);
                    mutationUser.reset();
                    mutationProfile.reset();
                    setBlankForm(false);
                }} icon={faRepeat}/>
            </div>


            <p className={styles.p}>Clique no ícone 🔁 acima para atualizar suas
                informações {changeForm ? "pessoais" : "complementares"}</p>


            <form className={`${styles.form} ${isLoading ? styles.disabled : ""}`} onSubmit={handleSubmit}>
                {changeForm && (
                    <PatchFieldsProfile isSuccess={profileSuccess} isError={profileError} isLoading={isLoading}/>
                )}

                {!changeForm && (
                    <PatchFieldsUser blankForm={userErrorBlankForm} isSuccess={userSuccess} isError={userError}
                                     isLoading={isLoading}/>
                )}

                <button className={styles.buttonSubmit} disabled={isLoading}
                        type="submit">{isLoading ? "Enviando dados..." : "Enviar"}</button>
            </form>
        </div>
    );
}

export default AboutPage;