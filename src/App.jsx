import Navbar from "./Components/Navbar";
import Mainpage from "./Pages/mainPage/mainPage";
import Usuarios from "./Pages/Usuarios/Usuarios";

function App() {
  return (
    <>
      <main className="App">
        <Navbar />
        <Mainpage />
        <Usuarios />
      </main>
    </>
  );
}

export default App;
