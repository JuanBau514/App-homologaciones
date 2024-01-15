import Navbar from "./Components/Navbar";
import Mainpage from "./Pages/mainPage";
import Homologaciones from "./Pages/Homologaciones";

function App() {
  return (
    <>
      <main className="App">
        <Navbar />
        <Mainpage />
        <Homologaciones />
      </main>
    </>
  );
}

export default App;
