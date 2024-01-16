import "./styleEmploye.css";
import Navbar from "../../Components/Navbar";

export default function Usuarios() {
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
            <a href="/dashboard/Forms/employe" className="navbar__menu--link">
              Agregar Estudiantes
            </a>
          </button>
          <button className="boton">Descargar Reporte</button>
        </div>

        <div className="contenedorEmpleados">
          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/src/assets/logoipsum-214.svg"
                width={800}
                height={400}
                alt="Foto"
              />
            </div>
            <h3>Pepe Perez</h3>
            <p> Código: EMP002</p>
            <p>Proyecto curricular: Tec. sistematizacion </p>
            <p>Sede: Tecnologica</p>
            <p>Fecha de Ingreso: 02/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Homologacion</button>
              <button className="btnc">Ver Homologacion</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/src/assets/react.svg"
                width={800}
                height={400}
                alt="Empleado 3"
              />
            </div>
            <h3>Juliana Martinez</h3>
            <p>Código: EMP002</p>
            <p>Proyecto curricular: Tec. Industrial </p>
            <p>Sede: Tecnologica</p>
            <p>Fecha de Ingreso: 02/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Homologacion</button>
              <button className="btnc">Ver Homologacion</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img src="/img/woman.png" width={800} height={400} alt="Foto" />
            </div>
            <h3>Maria Alfarez</h3>
            <p>Código: EMP002</p>
            <p>Proyecto curricular: Tec. Civil </p>
            <p>Sede: Tecnologica</p>
            <p>Fecha de Ingreso: 02/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Homologacion</button>
              <button className="btnc">Ver Homologacion</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img src="/img/man.png" width={800} height={400} alt="Foto" />
            </div>
            <h3>Juan Pedro Perez</h3>
            <p>Código: EMP002</p>
            <p>Proyecto curricular: Tec. Mecanica </p>
            <p>Sede: Tecnologica</p>
            <p>Fecha de Ingreso: 02/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Homologacion</button>
              <button className="btnc">Ver Homologacion</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/img/iconUserF.png"
                width={800}
                height={400}
                alt="Foto"
              />
            </div>
            <h3>Angelica Martinez</h3>
            <p>Código: EMP003</p>
            <p>Cargo: Gerente</p>
            <p>Sucursal: Sucursal C</p>
            <p>Salario: $70,000</p>
            <p>Fecha de Ingreso: 03/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Homologacion</button>
              <button className="btnc">Ver Homologacion</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
