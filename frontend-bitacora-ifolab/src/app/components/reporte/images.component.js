
"use client"

import { apiGetFiles } from "@/api/user.service";
import { getToken } from "@/utils/auth";
import React, { useEffect, useState, useRef } from "react";

export default function CarouselImages({ imagesArray }) {
    const [current, setCurrent] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const urlRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchImage() {
            setLoading(true);
            setError(null);
            setImageUrl(null);

            // Limpia la URL temporal anterior si existe
            if (urlRef.current) {
                URL.revokeObjectURL(urlRef.current);
                urlRef.current = null;
            }

            try {
                const imageName = imagesArray[current]?.name;
                if (!imageName) {
                    setError("Imagen no encontrada");
                    setLoading(false);
                    return;
                }
                const res = await apiGetFiles(`/post/${imageName}`, getToken());

                // Si res es un Response de fetch
                if (typeof window.Response !== "undefined" && res instanceof Response) {
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    urlRef.current = url;
                    if (isMounted) setImageUrl(url);
                }
                // Si res es un Blob
                else if (typeof window.Blob !== "undefined" && res instanceof Blob) {
                    const url = URL.createObjectURL(res);
                    urlRef.current = url;
                    if (isMounted) setImageUrl(url);
                }
                // Si res es un ArrayBuffer
                else if (res instanceof ArrayBuffer) {
                    const blob = new Blob([res]);
                    const url = URL.createObjectURL(blob);
                    urlRef.current = url;
                    if (isMounted) setImageUrl(url);
                }
                // Si res es una URL directa
                else if (typeof res === "string") {
                    if (isMounted) setImageUrl(res);
                }
                // Si res tiene una propiedad url
                else if (res?.url) {
                    if (isMounted) setImageUrl(res.url);
                }
                else {
                    if (isMounted) setError("No se pudo cargar la imagen");
                }
            } catch (err) {
                if (isMounted) setError("Error al cargar la imagen");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchImage();

        // Limpia la URL temporal al desmontar o cambiar de imagen
        return () => {
            isMounted = false;
            if (urlRef.current) {
                URL.revokeObjectURL(urlRef.current);
                urlRef.current = null;
            }
        };
    }, [current, imagesArray]);

    if (!imagesArray || imagesArray.length === 0) {
        return <div>No hay imágenes para mostrar.</div>;
    }

    const goPrev = () => {
        setCurrent((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrent((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
    };

    return (
        <div style={{
            position: "relative",
            width: "400px",
            margin: "0 auto",
            textAlign: "center"
        }}>
            {loading ? (
                <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Cargando imagen...
                </div>
            ) : error ? (
                <div style={{ color: "red", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {error}
                </div>
            ) : (
                imageUrl && (
                    <img
                        src={imageUrl}
                        alt={`Imagen ${current + 1}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            backgroundColor: '#ff0000',
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                        }}
                    />
                )
            )}
            {imagesArray.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        aria-label="Anterior"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                            fontSize: "18px"
                        }}
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Siguiente"
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                            fontSize: "18px"
                        }}
                    >
                        &#8594;
                    </button>
                </>
            )}
            <div style={{ marginTop: "8px", color: "#555", fontSize: "14px" }}>
                {current + 1} / {imagesArray.length}
            </div>
        </div>
    );
}
