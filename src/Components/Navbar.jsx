import { School2, LayoutGrid, GitCompareArrows, Menu } from "lucide-react";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className={`sidebar ${menuOpen ? "menu-open" : "menu-close"}`}>
      <div className="logo-detalles">
        <i>
          <School2 className="dashboard-icon" />
        </i>
        <span className="logo-name">U.Distrital</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/dashboard">
            <i>
              <LayoutGrid className="dashboard-icon" />
            </i>
            <span className="link_name">Inicio</span>
          </a>
        </li>
        <li>
          <a href="Homologaciones">
            <i>
              <GitCompareArrows className="dashboard-icon" />
            </i>
            <span className="link_name">Solicitudes</span>
          </a>
        </li>
        <li>
          <a href="Homologaciones">
            <i>
              <GitCompareArrows className="dashboard-icon" />
            </i>
            <span className="link_name">Usuarios</span>
          </a>
        </li>
        <li>
          <a href="Homologaciones">
            <i>
              <GitCompareArrows className="dashboard-icon" />
            </i>
            <span className="link_name">Configuracion</span>
          </a>
        </li>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <i>
          <Menu className="dashboard-icon-Menu" />
        </i>
      </div>
    </div>
  );
}
