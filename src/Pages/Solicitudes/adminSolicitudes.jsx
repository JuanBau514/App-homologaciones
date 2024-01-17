import {
  Frame,
  CalendarDays,
  ChevronDownCircle,
  SeparatorVertical,
  GitBranch,
  GitCommitHorizontal,
} from "lucide-react";

import Navbar from "../../Components/Navbar";

export default function AdminSolicitudes() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcf2e8]">
      <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
        <a href="#">
          <a className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
            <Frame className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
        </a>
        <Navbar />
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <a href="#" className="text-gray-500 dark:text-gray-400">
            Solicitudes
          </a>
          <a href="#" className="font-bold">
            Aprobadas
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-400">
            Rechazadas
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-400">
            Estadísticas
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-400">
            Configuraciones
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-400">
            Soporte
          </a>
        </nav>
        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <button className="rounded-full p-2 bg-white border">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">
            Solicitudes de Homologación
          </h1>
        </div>
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <input
              className="bg-white md:flex-1 dark:bg-gray-950 p-2 rounded"
              placeholder="Buscar solicitudes..."
              type="search"
            />
            <div className="flex items-center gap-4">
              <button className="pl-3 flex-1 bg-white justify-start border rounded">
                <CalendarDays className="mr-2 h-4 w-4 shrink-0" />
                Seleccionar Fecha
              </button>
              <div className="relative">
                <button className="bg-white dark:bg-gray-950 border rounded">
                  Estado
                  <ChevronDownCircle className="ml-2 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-950 border rounded hidden">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked />
                    <span>Pendiente</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Aprobado</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Rechazado</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100">
            {/* First item */}
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">Juan Pérez</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Solicitud de Homologación
                </div>
              </div>
              <SeparatorVertical className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                  <div>
                    Aprobado
                    <div className="text-gray-500 dark:text-gray-400">
                      1m 23s
                    </div>
                  </div>
                </div>
              </div>
              <SeparatorVertical className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Curso 3
                </div>
                <div className="flex items-center gap-2">
                  <GitCommitHorizontal className="w-4 h-4" />
                  <span className="line-clamp-1">
                    Curso Equivalente: Curso 4
                  </span>
                </div>
              </div>
              <SeparatorVertical className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  32m ago by maxleiter
                </div>
              </div>
            </div>

            {/* Second item */}
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">María López</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Solicitud de Homologación
                </div>
              </div>
              {/* ... (rest of the content for the second item) */}
            </div>

            {/* Third item */}
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">Pedro Martínez</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Solicitud de Homologación
                </div>
              </div>
              {/* ... (rest of the content for the third item) */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Other icons remain unchanged
