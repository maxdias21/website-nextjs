"use client";

import Image from "next/image";

import "./page.css";

import React, {useState} from "react";
import Link from "next/link";

const FRIENDS_LIST = [
    {photo: "https://picsum.photos/200/300", name: "Max"},
    {photo: "https://picsum.photos/200/300", name: "João"},
    {photo: "https://picsum.photos/200/300", name: "Maria"},
    {photo: "https://picsum.photos/200/300", name: "Pedro"},
    {photo: "https://picsum.photos/200/300", name: "Lucas"},
    {photo: "https://picsum.photos/200/300", name: "Ana"},
    {photo: "https://picsum.photos/200/300", name: "Carlos"},
    {photo: "https://picsum.photos/200/300", name: "Fernanda"},
    {photo: "https://picsum.photos/200/300", name: "Julia"},
    {photo: "https://picsum.photos/200/300", name: "Rafael"},
    {photo: "https://picsum.photos/200/300", name: "Gabriel"},
    {photo: "https://picsum.photos/200/300", name: "Matheus"},
    {photo: "https://picsum.photos/200/300", name: "Larissa"},
    {photo: "https://picsum.photos/200/300", name: "Bruno"},
    {photo: "https://picsum.photos/200/300", name: "Camila"},
    {photo: "https://picsum.photos/200/300", name: "Ricardo"},
    {photo: "https://picsum.photos/200/300", name: "Patricia"},
    {photo: "https://picsum.photos/200/300", name: "Vinicius"},
    {photo: "https://picsum.photos/200/300", name: "Amanda"},
    {photo: "https://picsum.photos/200/300", name: "Thiago"},
    {photo: "https://picsum.photos/200/300", name: "Eduardo"},
    {photo: "https://picsum.photos/200/300", name: "Beatriz"},
    {photo: "https://picsum.photos/200/300", name: "Gustavo"},
    {photo: "https://picsum.photos/200/300", name: "Isabela"},
    {photo: "https://picsum.photos/200/300", name: "Leonardo"},
    {photo: "https://picsum.photos/200/300", name: "Felipe"},
    {photo: "https://picsum.photos/200/300", name: "Natália"},
    {photo: "https://picsum.photos/200/300", name: "Daniel"},
    {photo: "https://picsum.photos/200/300", name: "Sofia"},
    {photo: "https://picsum.photos/200/300", name: "Henrique"},
];


function PhotosPage() {
    const [photos] = useState(FRIENDS_LIST);

    return (
        <div className="content">
            <div className="grid">
                {photos.map((photo, index) => (
                    <Link key={index} href="/profile/photos/1" scroll={false}>
                        <Image src={photo.photo} width={200} height={200} alt={"photos"}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PhotosPage;