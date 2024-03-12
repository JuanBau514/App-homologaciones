import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";

export default function MateriasEstudiante() {
  console.log("Trayendo datos crudos de mi servidor");
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
    <div className="bg-[#fcf2e8]  w-full py-6 space-y-6">
      <Navbar />
      <div className=" container px-4 lg:px-6 xl:max-w-6xl xl:mx-auto">
        {datos && (
          <>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Tecnología en sistematización de datos
              </h1>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                Tecnología / Tecnologia plan de estudio 286
              </p>
            </div>

            {
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Datos del estudiante
                </h2>
                <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                  <span className="font-bold">Nombre:</span>{" "}
                  {datos.estudiante.nombre}
                </p>
                <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                  <span className="font-bold">Identificación:</span>{" "}
                  {datos.estudiante.identificacion}
                </p>
                <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                  <span className="font-bold">Código:</span>{" "}
                  {datos.estudiante.codigo}
                </p>
                <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                  <span className="font-bold">Correo Electrónico:</span>{" "}
                  {datos.estudiante.correoElectronico}
                </p>
                <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                  <span className="font-bold">Proyecto Curricular:</span>{" "}
                  {datos.estudiante.proyectoCurricular}
                </p>
                <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                  <span className="font-bold">Renovaciones:</span>{" "}
                  {datos.estudiante.renovaciones}
                </p>
              </div>
            }

            <br />
            <div className="flex items-center space-x-8">
              <BookIcon className="flex w-5 h-5" />
              <span className="text-lg font-medium">Materias Aprobadas</span>
            </div>
            <br />
          </>
        )}
        {datos && datos.materias && datos.materias.length > 0 && (
          <div className="grid gap-y-10 gap-x-32 grid-cols-3 grid-rows-3">
            {datos.materias
              .filter(
                (materia) =>
                  materia.codMateria !== null || materia.nombreMateria === ""
              )
              .map((materia, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-6 h-56 w-96"
                >
                  <h2 className="text-xl font-bold">{materia.nombreMateria}</h2>
                  <br />
                  <p className="text-gray-500">Codigo: {materia.codMateria}</p>
                  <p className="text-gray-500">Nota: {materia.nota}</p>
                  <p className="text-gray-500">
                    Clasificación: {materia.clasificacion}
                  </p>
                  <p className="text-gray-500">Año: {materia.year}</p>
                </div>
              ))}
          </div>
        )}

        <div>
          <br />
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Materias Pendientes
          </h1>
          <br />
          {datos && datos.materias && datos.materias.length > 0 && (
            <div className="grid gap-y-10 gap-x-32 grid-cols-3 grid-rows-3">
              {datos.materias
                .filter(
                  (materia) =>
                    materia.codMateria === null && materia.nombreMateria !== ""
                )
                .map((materia, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-md p-6 h-56 w-96"
                  >
                    <h2 className="text-xl font-bold">
                      {materia.nombreMateria}
                    </h2>
                    <br />
                    <p className="text-gray-500">
                      Codigo: {materia.codMateria}
                    </p>
                    <p className="text-gray-500">Nota: {materia.nota}</p>
                    <p className="text-gray-500">
                      Clasificación: {materia.clasificacion}
                    </p>
                    <p className="text-gray-500">Año: {materia.year}</p>
                  </div>
                ))}
            </div>
          )}
          <br />
        </div>

        <br />
        <br />
        {datos && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Créditos aprobados
            </h2>
            <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {datos.creditosAprobados}
              </h1>
            </p>
          </div>
        )}
      </div>
      <br />
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
