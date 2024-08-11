import React, { useState, useEffect } from "react";
import "./styleEmploye.css";
import Navbar from "../../Components/Navbar";
import Papa from 'papaparse';

export default function Usuarios() {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    fetch('../../scripts/estudiantes.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setEstudiantes(results.data);
          }
        });
      });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <section className="empleados" id="empleados">
        <div className="tituloEmpleados">
          <span> Estudiantes </span>
          <h2>
            Información de los estudiantes que han solicitado Homologación{" "}
          </h2>
        </div>

        <div className="botones">
          <button className="boton">
            <a href="/Homologaciones" className="navbar__menu--link">
              Agregar Estudiantes
            </a>
          </button>
          <button className="boton">Descargar Reporte</button>
        </div>

        <div className="contenedorEmpleados">
          {estudiantes.map((estudiante, index) => (
            <div className="cajaEmpleado" key={index}>
              <div className="imgEmpleado">
                <img
                  src={estudiante.imagen || "/src/assets/avatar.png"}
                  width={800}
                  height={400}
                  alt="Foto"
                />
              </div>
              <h3>{estudiante.nombre}</h3>
              <p>Código: {estudiante.codigo}</p>
              <p>Proyecto curricular: {estudiante.proyectoCurricular}</p>
              <p>Sede: {estudiante.sede}</p>
              <p>Fecha de Ingreso: {estudiante.fechaIngreso}</p>
              <div className="botonCard">
                <button className="btnc">Eliminar Homologacion</button>
                <button className="btnc">Ver Homologacion</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}