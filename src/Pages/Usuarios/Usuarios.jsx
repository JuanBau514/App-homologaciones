import "./styleEmploye.css";

export default function Usuarios() {
  return (
    <div>
      <section className="empleados" id="empleados">
        <div className="tituloEmpleados">
          <span> Empleados </span>
          <h2>Información de nuestros empleados </h2>
        </div>

        <div className="botones">
          <button className="boton">
            <a href="/dashboard/Forms/employe" className="navbar__menu--link">
              Agregar Empleado
            </a>
          </button>
          <button className="boton">Descargar Reporte</button>
        </div>

        <div className="contenedorEmpleados">
          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/img/rev2.jpg"
                width={800}
                height={400}
                alt="Empleado 2"
              />
            </div>
            <h3>Pepe Perez</h3>
            <p>Código: EMP002</p>
            <p>Cargo: Diseñador</p>
            <p>Sucursal: Sucursal B</p>
            <p>Salario: $45,000</p>
            <p>Fecha de Ingreso: 02/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Empleado</button>
              <button className="btnc">Modificar Empleado</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/img/rev3.jpg"
                width={800}
                height={400}
                alt="Empleado 3"
              />
            </div>
            <h3>Angelica Martinez</h3>
            <p>Código: EMP003</p>
            <p>Cargo: Gerente</p>
            <p>Sucursal: Sucursal C</p>
            <p>Salario: $70,000</p>
            <p>Fecha de Ingreso: 03/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Empleado</button>
              <button className="btnc">Modificar Empleado</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/img/woman.png"
                width={800}
                height={400}
                alt="Empleado 3"
              />
            </div>
            <h3>Angelica Martinez</h3>
            <p>Código: EMP003</p>
            <p>Cargo: Gerente</p>
            <p>Sucursal: Sucursal C</p>
            <p>Salario: $70,000</p>
            <p>Fecha de Ingreso: 03/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Empleado</button>
              <button className="btnc">Modificar Empleado</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/img/man.png"
                width={800}
                height={400}
                alt="Empleado 3"
              />
            </div>
            <h3>Angelica Martinez</h3>
            <p>Código: EMP003</p>
            <p>Cargo: Gerente</p>
            <p>Sucursal: Sucursal C</p>
            <p>Salario: $70,000</p>
            <p>Fecha de Ingreso: 03/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Empleado</button>
              <button className="btnc">Modificar Empleado</button>
            </div>
          </div>

          <div className="cajaEmpleado">
            <div className="imgEmpleado">
              <img
                src="/img/iconUserF.png"
                width={800}
                height={400}
                alt="Empleado 3"
              />
            </div>
            <h3>Angelica Martinez</h3>
            <p>Código: EMP003</p>
            <p>Cargo: Gerente</p>
            <p>Sucursal: Sucursal C</p>
            <p>Salario: $70,000</p>
            <p>Fecha de Ingreso: 03/01/2022</p>
            <div className="botonCard">
              <button className="btnc">Eliminar Empleado</button>
              <button className="btnc">Modificar Empleado</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
