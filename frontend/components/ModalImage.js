import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

import styles from "./ModalImage.module.css";
import {useState} from "react";


function ModalImage({ref, setOpenModal, images, fullName}) {
    console.log(images)
    console.log('--------')

    if(!images) return;

    const [imagesCarousel, setImagesCarousel] = useState({
        setLeft: false,
        setRight: true,
        image: images[0],
        currentValue: 0
    });


    function handleImageChance({left, right}) {
        const curRightValue = imagesCarousel.currentValue + 1;
        const curLeftValue = imagesCarousel.currentValue - 1;
        const hasNextRight = curRightValue < images.length - 1;
        const hasNextLeft = imagesCarousel.currentValue > 1;


        if (right) {
            setImagesCarousel(prev => ({
                ...prev,
                setLeft: true,
                setRight: hasNextRight,
                image: images[curRightValue],
                currentValue: curRightValue
            }));
        }

        if (left) {
            setImagesCarousel(prev => ({
                ...prev,
                setRight: true,
                setLeft: hasNextLeft,
                currentValue: curLeftValue,
                image: images[curLeftValue]
            }));
        }
    }


    return (
        <dialog ref={ref} className={styles.modal} onClose={() => setOpenModal(false)}>
            <div className={styles.modal__content}>
                <div className={styles.modal__header}>
                    <div className={styles.modal__title}>
                        <div>
                            <Image unoptimized width={200} height={200} src={"https://picsum.photos/399/300"}
                                   alt="stories"/>
                        </div>
                        <div>{fullName}</div>
                    </div>
                    <FontAwesomeIcon className={styles["modal__button--close"]}
                                     onClick={() => setOpenModal(false)}
                                     icon={faX}/>
                </div>
                <hr/>

                <div className={styles.modal__body}>
                    {images.length > 1 ? (
                        <>
                            {imagesCarousel.setLeft && (
                                <FontAwesomeIcon  onClick={() => handleImageChance({left: true})} className={styles.modalBtnLeft} icon={faChevronLeft}/>
                            )}
                            <Image unoptimized width={200} height={200} src={imagesCarousel.image}
                                   alt="stories"/>
                            {imagesCarousel.setRight && (
                                <FontAwesomeIcon styles={{fontSize: '22.9rem;'}} onClick={() => handleImageChance({right: true})}
                                                 className={styles.modalBtnRight} icon={faChevronRight}/>

                            )}
                        </>
                    ) : <Image unoptimized width={200} height={200} src={images[0]}
                               alt="stories"/>}

                </div>
            </div>
        </dialog>
    );
}

export default ModalImage;