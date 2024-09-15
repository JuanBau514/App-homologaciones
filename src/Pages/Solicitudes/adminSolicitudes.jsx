import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import {
  Frame,
  SeparatorVertical,
  GitBranch,
  GitCommitHorizontal,
} from "lucide-react";

import Navbar from "../../Components/Navbar";

// Guardar y cargar datos del estado en LocalStorage
const saveToLocalStorage = (data) => {
  localStorage.setItem("solicitudes", JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem("solicitudes");
  return savedData ? JSON.parse(savedData) : [];
};

function parseExcelDate(excelDate) {
  if (typeof excelDate === 'number') {
    const excelBaseDate = new Date(1900, 0, 1); // 1 de enero de 1900
    return new Date(excelBaseDate.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000); // Ajustar por días
  } else if (typeof excelDate === 'string') {
    const [datePart, timePart] = excelDate.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart ? timePart.split(':').map(Number) : [0, 0, 0];
    return new Date(year, month - 1, day, hours, minutes, seconds);
  } else {
    return null; // Si no es ni número ni cadena, no podemos procesar
  }
}

export default function AdminSolicitudes() {
  const [excelData, setExcelData] = useState(loadFromLocalStorage);
  const [filter, setFilter] = useState("Todos"); // Estado para el filtro

  // Función para procesar el archivo Excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
      saveToLocalStorage(jsonData); // Guardar datos en LocalStorage
    };

    reader.readAsArrayBuffer(file);
  };

  // Guardar datos en LocalStorage cada vez que cambian
  useEffect(() => {
    saveToLocalStorage(excelData);
  }, [excelData]);

  // Función para asignar color al círculo según el estado
  const getStatusColor = (estado) => {
    switch (estado) {
      case "Aprobado":
        return "bg-green-400";
      case "Rechazado":
        return "bg-red-400";
      case "En Espera":
        return "bg-yellow-400";
      default:
        return "bg-gray-400"; // Por defecto si no tiene estado definido
    }
  };

  // Filtrar los datos según el estado
  const filteredData = filter === "Todos"
    ? excelData
    : excelData.filter(row => row.Estado === filter);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcf2e8]">
      <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
        <a href="#">
          <a className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
            <Frame className="w-6 h-6" />
          </a>
        </a>
        <Navbar />
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <a 
            href="#"
            className={`font-bold ${filter === "Aprobado" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}
            onClick={() => setFilter("Aprobado")}
          >
            Aprobadas
          </a>
          <a 
            href="#"
            className={`text-gray-500 dark:text-gray-400 ${filter === "Rechazado" ? "text-blue-600" : ""}`}
            onClick={() => setFilter("Rechazado")}
          >
            Rechazadas
          </a>
          <a 
            href="#"
            className={`text-gray-500 dark:text-gray-400 ${filter === "En Espera" ? "text-blue-600" : ""}`}
            onClick={() => setFilter("En Espera")}
          >
            En Espera
          </a>
          <a href="/Configuracion" className="text-gray-500 dark:text-gray-400">
            Configuraciones
          </a>
          <a href="/Homologaciones" className="text-gray-500 dark:text-gray-400">
            Nueva Homologacion
          </a>
        </nav>
      </header>

      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Solicitudes de Homologación</h1>
        </div>

        {/* Botón para subir el archivo Excel */}
        <div className="flex justify-center">
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>

        {/* Mostrar los datos del Excel */}
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          {filteredData.length > 0 &&
            filteredData.map((row, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950"
              >
                <div className="p-2 grid gap-1 flex-1">
                  <div className="font-medium">{row["Cual es su nombre?"]}</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Solicitud de Homologación
                  </div>
                </div>
                <SeparatorVertical className="my-2 lg:hidden" />
                <div className="p-2 grid gap-1 flex-1">
                  <div className="flex items-start gap-2">
                    <span
                      className={`inline-flex w-3 h-3 rounded-full translate-y-1 ${getStatusColor(
                        row.Estado
                      )}`}
                    />
                    <div>
                      Estado: {row.Estado}
                      <div className="text-gray-500 dark:text-gray-400">
                        {parseExcelDate(row["Hora de inicio"]).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <SeparatorVertical className="my-2 lg:hidden" />
                <div className="p-2 grid gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    Carrera: {row.Carrera}
                  </div>
                  <div className="flex items-center gap-2">
                    <GitCommitHorizontal className="w-4 h-4" />
                    Código: {row.Codigo}
                  </div>
                </div>
                <SeparatorVertical className="my-2 lg:hidden" />
                <div className="p-2 grid gap-1 flex-1">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    {row.Correo}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
