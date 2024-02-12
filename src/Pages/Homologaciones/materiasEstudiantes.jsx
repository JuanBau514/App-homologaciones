import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";

export default function materiasEstudiante() {
  console.log("trayendo datos crudos de mi server");
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    async function fetchDatos() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/datos-estudiante"
        );
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchDatos();
  }, []);

  console.log("Datos:", datos);

  return (
    <div className="w-full py-6 space-y-6">
      <Navbar />
      <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
        {datos && (
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Tecnología en sistematización de datos
            </h1>
            <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
              Tecnología / Tecnologia plan de estudio 286
            </p>
          </div>
        )}
        {datos && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">
                Materias
              </span>
            </div>
          </div>
        )}
      </div>
      {datos && datos.Completadas && datos.Completadas.length > 0 && (
        <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Materias completadas
            </h2>
            <ul className="list-disc pl-6">
              {datos.Completadas.map((materia, index) => (
                <li key={index}>{materia}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {datos && datos.Pendientes && datos.Pendientes.length > 0 && (
        <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Materias pendientes
            </h2>
            <ul className="list-disc pl-6">
              {datos.Pendientes.map((materia, index) => (
                <li key={index}>{materia}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {datos && (
        <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Créditos aprobados
            </h2>
            <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
              {datos.creditosAprobados}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
