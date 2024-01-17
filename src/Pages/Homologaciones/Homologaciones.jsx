import Navbar from "../../Components/Navbar";

export default function Homologacion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcf2e8] dark:bg-gray-900">
      <Navbar />
      <div className="w-full max-w-4xl mx-auto flex flex-row justify-between gap-4">
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 m-4 w-[800px] h-[600px]">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Upload HTML File
          </h2>

          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Drag drop some files here, or click to select files
          </p>

          {/* Modificado el botón para cargar manualmente */}
          <label
            htmlFor="file-upload"
            className="mt-4 cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-indigo-600"
          >
            Upload File Manually
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".html"
            className="hidden" // Oculta el input de tipo "file"
          />

          <div className="mt-8 relative">
            <label className="sr-only" htmlFor="file-upload">
              Upload File
            </label>
            <input
              accept=".html"
              className="w-full px-48 py-44 text-lg border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
              <p className="text-2xl text-gray-500">Drag here</p>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-6 p-6 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 m-4 w-[800px] h-[600px]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            HTML Preview
          </h2>
          <div className="mt-4 p-4 bg-gray-100 rounded-md dark:bg-gray-700">
            <p className="text-gray-900 dark:text-gray-100">
              HTML content will be displayed here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
