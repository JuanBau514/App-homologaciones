import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Función para cambiar el estado y mostrar/ocultar la barra
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div
        id="barra-menu"
        className={`barra bar-menu menu-icon ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>

      <header className={`${isMenuOpen ? "active" : ""}`}>
        <a href="#" className="logo">
          <span> Bienvenido </span>
        </a>

        <nav className="navbar">
          <ul className="navbar__menu">
            <li className="navbar__menu--item">
              <a href="/dashboard/home" className="navbar__menu--link">
                Inicio
              </a>
            </li>
            <li className="navbar__menu--item">
              <a href="/dashboard/adminEmpl" className="navbar__menu--link">
                Administrar Empleados
              </a>
            </li>
            <li className="navbar__menu--item">
              <a href="/dashboard/adminClients" className="navbar__menu--link">
                Homologaciones
              </a>
            </li>
            <li className="navbar__menu--item">
              <a href="/dashboard/adminCars" className="navbar__menu--link">
                Solicitudes
              </a>
            </li>
            <li className="navbar__menu--item">
              <a href="/dashboard/adminTrans" className="navbar__menu--link">
                Usuarios
              </a>
            </li>
            <li className="navbar__menu--item">
              <a href="/dashboard/adminOffices" className="navbar__menu--link">
                Configuracion
              </a>
            </li>
          </ul>
        </nav>

        <div className="navbar__toggle" id="mobile-menu">
          <span className="bar"></span> <span className="bar"></span>{" "}
          <span className="bar"></span>
        </div>
      </header>
    </div>
  );
}
