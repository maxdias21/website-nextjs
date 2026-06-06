"use client";

import "./page.css";
import {useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

function AboutPage() {
    const [isErrors] = useState([]);
    const [changeForm, setChangeForm] = useState(true);

    const CustomTag = "h3";
    const titleEditDetails = changeForm ?  <CustomTag>Editar detalhes</CustomTag> : <CustomTag>Editar informações pessoais</CustomTag>

    async function cityExist(city) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);
        const data = await response.json();

        return data.length > 0;

    }

    async function handleSubmit(e) {
        e.preventDefault();

        /*
        const formData = new FormData(e.target);
        const currentyCity = await cityExist(formData.get("currentyCity"));
        const homeTown = await cityExist(formData.get("homeTown"));

        if(currentyCity.length !== 0) {
            setIsErrors((prevState) => [...prevState, "Digite uma cidade atual inválida"]);
        }

        if(homeTown.length !== 0) {
            setIsErrors((prevState) => [...prevState, "Digite uma cidade atual inválida"]);
        }*/
    }

    return (
        <div className="content">
            <div className="detailsHeader">
                {titleEditDetails}
                <FontAwesomeIcon onClick={() => setChangeForm(!changeForm)} icon={faRepeat} />
            </div>
            <p className="p">Clique no ícone 🔁 acima para atualizar suas informações {changeForm ?  "pessoais" : "complementares"}</p>

            {changeForm && (
                    <form onSubmit={handleSubmit}>
                        <input name="currentyCity" onClick={() => cityExist("santos")}
                               placeholder="Você mora atualmente em?"/>
                        <input name="homeTown" placeholder="Você é de qual cidade?"/>
                        <select>
                            <option>Masculino</option>
                            <option>Feminino</option>
                            <option>Outro</option>
                        </select>
                        {isErrors.length > 0 && (
                            isErrors.map((error, index) => (
                                <div key={index}>
                                    <p>{error}</p>
                                </div>
                            ))
                        )}
                        <button type="subtmit">Enviar</button>
                    </form>
            )}

            {!changeForm && (
                    <form>
                        <input name="first_name" placeholder="Nome"/>
                        <input name="last_name" placeholder="Sobrenome"/>

                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                        />

                        <button type="submit">
                            Enviar
                        </button>
                    </form>
            )}

        </div>
    );
}

export default AboutPage;