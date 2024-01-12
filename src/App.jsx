import "./App.css";
import Sidebar from "./Components/Sidebar";
import Mainpage from "./Pages/mainPage";

function App() {
  return (
    <>
      <main className="flex-1">
        <Sidebar />
        <Mainpage />
      </main>
    </>
  );
}

export default App;
