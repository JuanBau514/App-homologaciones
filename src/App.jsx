import Mainpage from "./Pages/mainPage/mainPage";
import Usuarios from "./Pages/Usuarios/Usuarios";
import Homologacion from "./Pages/Homologaciones/Homologaciones";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/Homologaciones" element={<Homologacion />} />
          <Route path="/Usuarios" element={<Usuarios />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
