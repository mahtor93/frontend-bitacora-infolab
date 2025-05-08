"use client";
import { useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/auth";

const Proyectos = () => {
  const [file, setFile] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [peticion, setPeticion] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setFotos([...fotos, ...urls]);
    setFile(selectedFiles);
  };

  const borrarFoto = (index) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
    setFile((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || file.length === 0) {
      alert("Debes seleccionar al menos una imagen.");
      return;
    }
    setPeticion(true);

    try {
      const formData = new FormData();
      const token = getToken()
      file.forEach((file) => formData.append("file", file));
      /*
      formData.append("title", nombre);
      formData.append("description", descripcion);
      formData.append("location", "s_302");
      formData.append("category", "1");
          */
        formData.append("data", JSON.stringify({
          "title": "* teclados desconectados",
          "description": "se encontraron 3 computadores con teclados deconectados",
          "location": "s_302",
          "category": "1"
        }));

        //await apiPost('/pruebafotos', token, formData)

        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
          },

        });

        alert("Proyecto creado exitosamente");
        setFile(null);
        setFotos([]);
        setNombre("");
        setDescripcion("");
      } catch (error) {
        alert("Error al subir las imágenes.");
      } finally {
        setPeticion(false);
      }
    };

    return (
      <div className="p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Crear Proyecto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
          <textarea
            placeholder="Descripción del proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full min-h-[80px]"
          />
          <input
            type="file"
            multiple
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
            className="block"
          />
          <div className="grid grid-cols-3 gap-4">
            {fotos.map((foto, index) => (
              <div key={index} className="relative">
                <img src={foto} alt={`Imagen ${index}`} className="w-full rounded" />
                <button
                  type="button"
                  onClick={() => borrarFoto(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={peticion}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
          >
            Guardar
          </button>
        </form>
      </div>
    );
  };

  export default Proyectos;