import { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

var archivoMaterias = "";

export default function Homologacion() {
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const cargarArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const lectura = new FileReader();
      lectura.onload = (e) => {
        const contenido = e.target.result;
        setFileContent(contenido);
        setIsFileLoaded(true); // Establecer que el archivo se ha cargado
      };
      lectura.readAsText(archivo);
      archivoMaterias = archivo;
    }
    console.log(archivoMaterias);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcf2e8] dark:bg-gray-900">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto flex flex-row justify-between gap-6">
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800 m-1 w-[900px] h-[800px]">
          <h2 className="text-5xl font-bold text-gray-950 dark:text-gray-200">
            Sube el archivo HTML
          </h2>

          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Sube el archivo HTML a homologar ya sea con tu mouse o de forma
            manual usando el boton
          </p>

          {/* Modificado el botón para cargar manualmente */}
          <label
            htmlFor="file-upload"
            className="mt-4 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-indigo-600"
          >
            Sube el archivo manualmente
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".html"
            className="hidden"
            onChange={cargarArchivo}
          />

          <div className="mt-8 relative">
            <input
              accept=".html .pdf"
              className="w-full px-48 py-44 text-lg border border-gray-300 rounded-md shadow-sm placeholder-green-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
              <p className="text-2xl text-gray-500">Suelta el archivo aqui</p>
            </div>
          </div>
          <a
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="materiasEstudiantes"
          >
            Mostrar materias homologadas
            <Link to="./materiasEstudiantes.jsx"></Link>
          </a>
        </div>

        <div className="flex-1 mt-6 p-6 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 m-4 w-[800px] h-[600px]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Vista previa del archivo
          </h2>
          <div className="mt-4 p-4 bg-gray-100 rounded-md dark:bg-gray-700">
            <p className="text-gray-900 dark:text-gray-100">{fileContent}</p>{" "}
            {
              // Mostrar el contenido del archivo si se ha cargado
              isFileLoaded ? (
                <p className="text-gray-900 dark:text-gray-100">
                  {fileContent && <Link to="./materiasEstudiantes.jsx"></Link>}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No se ha cargado ningun archivo
                </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
