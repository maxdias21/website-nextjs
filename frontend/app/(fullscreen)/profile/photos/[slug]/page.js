"use client";

import Detail from "../../../../../components/Post/Detail";

import {useParams, useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {formatDistance} from "date-fns";
import {ptBR} from "date-fns/locale";

function PhotoProfilePage() {
    const router = useRouter();
    const params = useParams();

    function handleClick() {
        router.back();
    }

    const {data, isLoading} = useQuery({
        queryKey: ["photo"],
        queryFn: async () => {
            const response = await fetch(`/django/photos/${params?.slug}`, {method: "GET"});
            return response.json();
        }
    });

    if (isLoading) return null;

    const fullName = `${data?.user?.first_name} ${data?.user?.last_name}`;
    const formattedData = formatDistance(new Date(data?.created_at), new Date(), {
        addSuffix: true,
        locale: ptBR
    });

    return (
        <Detail posted={formattedData} image={data?.photo} name={fullName} setOpenPostModal={handleClick}/>
    );
}

export default PhotoProfilePage;