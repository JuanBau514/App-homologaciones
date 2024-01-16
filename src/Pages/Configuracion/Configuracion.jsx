import Navbar from "../../Components/Navbar";
export default function Configuracion() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-[#fcf2e8]">
        <a
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          href="#"
        >
          <Navbar></Navbar>

          <span className="sr-only">Settings Dashboard</span>
        </a>
      </header>

      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] bg-[#fcf2e8] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="grid md:grid-cols-[1fr_180px]  bg-[#FFFFFF]   lg:grid-cols-[1fr_250px] items-start gap-6 max-w-6xl w-full mx-auto">
          <div className="grid gap-6">
            <div className="border rounded p-4">
              <h2 className="text-xl font-semibold mb-4">
                {" "}
                Configuracion Homologaciones
              </h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    className="border w-full p-2 rounded"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    className="border w-full p-2 rounded"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </form>
              <div className="border-t pt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </div>
            {/* Similar modifications for other cards */}
          </div>
          <nav className="text-sm text-gray-700 grid gap-4 dark:text-gray-400">
            <a
              className="font-semibold text-gray-900 dark:text-gray-50"
              href="#"
            >
              Perfil
            </a>
            <a href="#">Notificaciones</a>
            <a href="#">Security</a>
            <a href="#">Preferences</a>
          </nav>
        </div>
      </main>
    </div>
  );
}
