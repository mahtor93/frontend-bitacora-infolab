
"use client"
import styles from "./images.module.css"
import { apiGetFiles } from "@/api/user.service";
import { getToken } from "@/utils/auth";
import React, { useEffect, useState, useRef } from "react";

export default function CarouselImages({ imagesArray }) {
    const [current, setCurrent] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const urlRefs = useRef([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchAllImages() {
            setLoading(true);
            setError(null);
            setImageUrls([]);

            // Limpia las URLs temporales anteriores si existen
            urlRefs.current.forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
            urlRefs.current = [];

            try {
                const promises = imagesArray.map(async (img, idx) => {
                    const imageName = img?.name;
                    if (!imageName) return null;
                    const res = await apiGetFiles(`/post/${imageName}`, getToken());

                    // Si res es un Response de fetch
                    if (typeof window.Response !== "undefined" && res instanceof Response) {
                        const blob = await res.blob();
                        const url = URL.createObjectURL(blob);
                        urlRefs.current[idx] = url;
                        return url;
                    }
                    // Si res es un Blob
                    else if (typeof window.Blob !== "undefined" && res instanceof Blob) {
                        const url = URL.createObjectURL(res);
                        urlRefs.current[idx] = url;
                        return url;
                    }
                    // Si res es un ArrayBuffer
                    else if (res instanceof ArrayBuffer) {
                        const blob = new Blob([res]);
                        const url = URL.createObjectURL(blob);
                        urlRefs.current[idx] = url;
                        return url;
                    }
                    // Si res es una URL directa
                    else if (typeof res === "string") {
                        return res;
                    }
                    // Si res tiene una propiedad url
                    else if (res?.url) {
                        return res.url;
                    }
                    else {
                        return null;
                    }
                });

                const urls = await Promise.all(promises);
                if (isMounted) setImageUrls(urls);
            } catch (err) {
                if (isMounted) setError("Error al cargar las imágenes");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        if (imagesArray && imagesArray.length > 0) {
            fetchAllImages();
        }

        // Limpia las URLs temporales al desmontar
        return () => {
            isMounted = false;
            urlRefs.current.forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
            urlRefs.current = [];
        };
    }, [imagesArray]);


    if (!imagesArray || imagesArray.length === 0) {
        return <div></div>;
    }

    const goPrev = () => {
        setCurrent((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrent((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
    };

        useEffect(() => {
        if (!isFullScreen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsFullScreen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullScreen]);

    const openFullScreen = () => {
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
    };

    return (
        <div className={styles.imageCarrousel}>
            {loading ? (
                <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Cargando imágenes...
                </div>
            ) : error ? (
                <div style={{ color: "red", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {error}
                </div>
            ) : (
                imageUrls[current] && (
                    <div className={styles.imageContainer}>
                        <img
                            src={imageUrls[current]}
                            alt={`Imagen ${current + 1}`}
                            onClick={openFullScreen}
                        />
                    </div>
                )
            )}

            {imagesArray.length > 1 && (
                <div className={styles.buttonRack}>
                    <button
                        onClick={goPrev}
                        aria-label="Anterior"
                        className={styles.carrouselButton}
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Siguiente"
                        className={styles.carrouselButton}
                    >
                        &#8594;
                    </button>
                </div>
            )}
            <div style={{ marginTop: "8px", color: "#555", fontSize: "14px" }}>
                {current + 1} / {imagesArray.length}
            </div>
             {/* Modal de pantalla completa */}
            {isFullScreen && imageUrls[current] && (
                <div className={styles.fullscreenOverlay} onClick={closeFullScreen}>
                    <img
                        src={imageUrls[current]}
                        alt={`Imagen ${current + 1}`}
                        className={styles.fullscreenImage}
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        className={styles.closeButton}
                        onClick={closeFullScreen}
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
}
