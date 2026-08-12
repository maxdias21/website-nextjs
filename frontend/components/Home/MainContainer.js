import AsideContainer from "./AsideContainer";

import styles from "./MainContainer.module.css";
import stylesShared from "./MainContainer.module.css";

import StoriesContainer from "@/components/StoriesContainer";
import Container from "@/components/Post/Container";
import Posts from "../Post/Posts";

import {useQuery} from "@tanstack/react-query";

import {apiFetch} from "../../lib/api";

function MainContainer({posts}) {
    const isPosts = posts?.data?.length > 0 ? posts?.data : [];
    const isError = posts?.error;

    const {data, isLoading} = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const response = await apiFetch("/django/stories/", {method: "GET"});
            return await response.json();
        }
    });

    return (
        <>
            <main className={`${styles.main} ${stylesShared.containerCenter}`}>
                <div className={styles.mainContainer}>
                    <Container/>
                    <StoriesContainer data={data}/>
                    {isError && (
                        <h1>Erro ao encontrar posts</h1>
                    )}
                    {isPosts && !isError && <Posts posts={isPosts} query={"posts"}/>}
                    {!posts.data.length > 0 && <h2 className={styles.noMorePosts}>Não há mais posts para mostrar</h2>}
                </div>
            </main>
            <AsideContainer/>
        </>
    );
}

export default MainContainer;