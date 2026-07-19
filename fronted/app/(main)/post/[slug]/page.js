"use client";

import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {apiFetch} from "../../../../lib/api";

import Detail from "../../../../components/Post/Detail";
import {formattedData} from "@/utils/utils";

function PostDetailPage() {
    const params = useParams();
    const {data, isLoading} = useQuery(({
        queryKey: ["post"],
        queryFn: async () => {
            const response = await apiFetch(`/django/posts/${params.slug}/`, {method: "GET"});
            return response.json();
        }
    }));

    if (isLoading) return null;

    const fullName = `${data?.user?.first_name} ${data?.user?.last_name}`
    const dataPost = formattedData(data?.creat_at);

    return (
        <Detail image={data?.photo} posted={dataPost} name={fullName}/>
    );
}

export default PostDetailPage;