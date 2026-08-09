import "./not-found.css";

const TITLE = "Página não encontrada";
const DESCRIPTION = "Ops! Parece que você se perdeu um pouco. Não se preocupe, isso acontece com os melhores. Que tal voltar para a nossa página inicial?";

function NotFound({title=TITLE, description=DESCRIPTION}) {
    return (
        <div className="content__container">
            <div className="error__container">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default NotFound;