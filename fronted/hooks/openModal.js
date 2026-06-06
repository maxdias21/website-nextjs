"use client";

import {useEffect, useState} from "react";

export function useOpenModal({ref}) {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const modalElement = ref?.current;

        if (openModal) {
            modalElement?.showModal();
            document.body.style.overflow = "hidden";
        } else {
            modalElement?.close();
            document.body.style.overflow = "auto";
        }


        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openModal, ref]);

    return [openModal, setOpenModal];
}
