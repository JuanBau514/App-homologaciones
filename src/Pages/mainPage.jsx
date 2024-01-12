export default function Mainpage() {
  return (
    <main className="flex flex-col items-center justify-center py-14 md:py-240 lg:py-320 bg-[#fcf2e8] dark:bg-[#0b162a]">
      <section className="w-full h-full px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-[#8B0000] sm:text-5xl xl:text-6xl/none">
                Bienvenido a Nuestro Sistema de Gestión de Homologaciones
              </h1>
              <p className="max-w-[600px] text-[#333333] md:text-xl">
                Proporcionamos los mejores servicios para ayudarte a lograr tus
                objetivos académicos. Comencemos el viaje juntos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#8B0000] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#fcd116] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0b162a] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#fcd116] dark:text-gray-900 dark:hover:bg-[#ffcd00] dark:focus-visible:ring-[#0b162a]"
                href="#"
              >
                Comenzar
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Aprender Más
              </a>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/src/assets/logoipsum-214.svg"
            width="550"
          />
        </div>
      </section>
    </main>
  );
}
