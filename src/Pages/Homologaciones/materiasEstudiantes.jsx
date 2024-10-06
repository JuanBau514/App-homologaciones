import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function MateriasEstudiante() {

  console.log("Trayendo datos crudos de mi servidor");
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function fetchDatos() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/datos-estudiante"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setError("No se pudieron cargar los datos. Por favor, comuníquese con el desarrollador.");
    } finally {
      setLoading(false);
    }
  }

  fetchDatos();
}, []);

  console.log("Datos del estudiante:", datos);

    const generarPDF = () => {
      console.log('Iniciando generación de PDF...');
      if (!datos) {
        console.log('No hay datos disponibles');
        return;
      }

      try {
        const doc = new jsPDF();
        let yPos = 20;

        console.log('Añadiendo título...');
        doc.setFontSize(18);
        doc.text('Reporte del Estudiante', 105, yPos, { align: 'center' });
        yPos += 10;

        console.log('Añadiendo información general...');
        doc.setFontSize(12);
        doc.text(`Programa: Tecnología en sistematización de datos`, 20, yPos);
        yPos += 10;
        doc.text(`Plan de estudio: 239`, 20, yPos);
        yPos += 10;
        doc.text(`Créditos aprobados: ${datos.creditosAprobados}`, 20, yPos);
        yPos += 20;

        console.log('Añadiendo materias aprobadas...');
        doc.setFontSize(14);
        doc.text('Materias Aprobadas', 20, yPos);
        yPos += 10;

        const aprobadasHeaders = ['Nombre', 'Código', 'Nota', 'Clasificación', 'Año'];
        const aprobadasData = datos.materias
          .filter(materia => materia.codMateria !== null || materia.nombreMateria === '')
          .map(materia => [
            materia.nombreMateria,
            materia.codMateria,
            materia.nota,
            materia.clasificacion,
            materia.year
          ]);

        doc.autoTable({
          startY: yPos,
          head: [aprobadasHeaders],
          body: aprobadasData,
        });

        yPos = doc.lastAutoTable.finalY + 20;

        console.log('Añadiendo materias pendientes...');
        doc.setFontSize(14);
        doc.text('Materias Pendientes', 20, yPos);
        yPos += 10;

        const pendientesHeaders = ['Nombre', 'Código', 'Nota', 'Clasificación', 'Año'];
        const pendientesData = datos.materias
          .filter(materia => materia.codMateria === null && materia.nombreMateria !== '')
          .map(materia => [
            materia.nombreMateria,
            materia.codMateria,
            materia.nota,
            materia.clasificacion,
            materia.year
          ]);

        doc.autoTable({
          startY: yPos,
          head: [pendientesHeaders],
          body: pendientesData,
        });

        console.log('Guardando PDF...');
        doc.save('reporte_estudiante.pdf');
        console.log('PDF guardado exitosamente');
      } catch (error) {
        console.error('Error al generar el PDF:', error);
      }
};

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!datos) return <div>No hay datos disponibles</div>;

  return (
    <div className="bg-[#fcf2e8]  w-full py-6 space-y-6">
      <Navbar />
      <div className=" container px-4 lg:px-6 xl:max-w-6xl xl:mx-auto">
        {datos && (
          <>
            <div className="space-y-15">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-6xl">
                Tecnología en sistematización de datos
              </h1>
              <br />
            </div>
            <div className="space-x-10 flex justify-end">
            <p className="text-gray-500 md:text-base/relaxed dark:text-gray-200">
                Tecnología / plan de estudio 339
            </p>
           <button onClick={generarPDF} className=" justify-end bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded">
              Descargar reporte del estudiante
            </button>
            </div>
            <br />
            <div>
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Datos del Estudiante
              </h1>
              <br />
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Nombre:</span> {datos.estudiante.nombre}
              </p>
                 <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Identificacion:</span> {datos.estudiante.identificacion}
              </p>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Código:</span> {datos.estudiante.codigo}
              </p>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Correo Electronico:</span> {datos.estudiante.correoElectronico}
              </p>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Renovaciones:</span> {datos.estudiante.renovaciones}
              </p>
                 <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Proyecto Curricular:</span> {datos.estudiante.proyectoCurricular}
              </p>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                <span className="font-bold">Créditos aprobados:</span>{" "}
                {datos.creditosAprobados}
              </p>
              <br />
            </div>
            <div className="flex items-center space-x-8">
              <BookIcon className="flex w-5 h-5" />
              <span className="text-lg font-medium">Materias Aprobadas</span>
            </div>
            <br />
          </>
        )}

        {datos && datos.materias && datos.materias.length > 0 && ( 
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Código</th>
                  <th className="border p-2">Nota</th>
                  <th className="border p-2">Clasificación</th>
                  <th className="border p-2">Año</th>
                </tr>
              </thead>
              <tbody>
                {datos.materias
                  .filter(
                    (materia) =>
                      materia.codMateria !== null || materia.nombreMateria === ""
                  )
                  .reduce((rows, materia, index) => {
                    if (index % 7 === 0) rows.push([]);
                    rows[rows.length - 1].push(materia);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      {row.map((materia, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <td className="border p-2">{materia.nombreMateria}</td>
                          <td className="border p-2">{materia.codMateria}</td>
                          <td className="border p-2">{materia.nota}</td>
                          <td className="border p-2">{materia.clasificacion}</td>
                          <td className="border p-2">{materia.year}</td>
                        </tr>
                      ))}
                      {rowIndex < Math.floor(datos.materias.length / 7) && (
                        <tr className="h-4 bg-gray-300">
                          <td colSpan="5"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}

        <div>
          <br />
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Materias Pendientes
          </h1>
          <br />
          {datos.materiasPendientes && datos.materiasPendientes.length > 0 ? (
            <div className="grid gap-y-10 gap-x-32 grid-cols-3 grid-rows-3">
              {datos.materiasPendientes.map((materia, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-6 h-56 w-96"
                >
                  <h2 className="text-xl font-bold">
                    {materia.nombreMateria}
                  </h2>
                  <br />
                  <p className="text-gray-500">
                    Codigo: {materia.codMateria || 'N/A'}
                  </p>
                  <p className="text-gray-500">
                    Créditos: {materia.creditos || 'N/A'}
                  </p>
                  <p className="text-gray-500">
                    Clasificación: {materia.clasificacion || 'N/A'}                    
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay materias pendientes</p>
          )}
        </div>

        <br />
        <br />
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Resumen de Créditos
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                Créditos Aprobados
              </p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {datos.creditosAprobados || 0}
              </h1>
            </div>
            <div>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                Créditos Pendientes
              </p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {datos.creditosPendientes || 0}
              </h1>
            </div>
            <div>
              <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
                Porcentaje de Avance
              </p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {datos.porcentajeAvance || '0%'}
              </h1>
            </div>
          </div>
        </div>
      </div>
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
