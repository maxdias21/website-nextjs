import styles from './Text.module.css';

function Text() {
    return (
        <div className={styles.textHeader}>
            <h2>Começe a usar o site e participe da nossa comunidade!</h2>
            <p>Crie uma conta para se conectar com amigos, familiares e comunidades de pessoas com os mesmos
                interesses que você.</p>
        </div>
    )
}

export default Text;