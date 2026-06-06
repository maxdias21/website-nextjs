import AsideContainer from "./AsideContainer";

import styles from "./MainContainer.module.css";
import stylesShared from "./MainContainer.module.css";

import Post from "@/components/Post/Post";
import StoriesContainer from "@/components/StoriesContainer";
import Container from "@/components/Post/Container";

function MainContainer({posts}) {
    const isPosts = posts?.data.length > 0;
    const isError = posts?.error;

    return (
        <>
            <main className={`${styles.main} ${stylesShared.containerCenter}`}>
                <div className={styles.mainContainer}>
                    <Container/>
                    <StoriesContainer/>
                    {isError && (
                        <h1>Erro ao encontrar posts</h1>
                    )}
                    {isPosts && !isError && posts?.data?.map((post, index) => (
                        <Post post={post} key={index}/>
                    ))}
                    {!posts.data.length > 0 && <h2 className={styles.noMorePosts}>Não há mais posts para mostrar</h2>}
                </div>
            </main>
            <AsideContainer/>
        </>
    );
}

export default MainContainer;