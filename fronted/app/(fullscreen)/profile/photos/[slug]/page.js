"use client";

import Detail from "../../../../../components/Post/Detail";

import { useRouter } from 'next/navigation'

function PhotoProfilePage() {
    const router = useRouter();

    function handleClick() {
        router.back();
    }

    return (
        <div>
            <Detail setOpenPostModal={handleClick} />
        </div>
    );
}

export default PhotoProfilePage;