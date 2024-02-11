import Navbar from "../../Components/Navbar";

export default function materiasEstudiante() {
  return (
    <div className="w-full py-6 space-y-6">
      <Navbar />

      <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Tecnologia en sistematizacion de datos
          </h1>
          <p className="text-gray-500 md:text-base/relaxed dark:text-gray-400">
            Tecnologia / Ingeneria
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookIcon className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Materias</span>
          </div>
        </div>
      </div>
      <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Primer semestre 1
          </h2>
          <div className="flex items-center space-x-4">
            <ClockIcon className="w-5 h-5" />
            <span className="text-green-600">Completed</span>
          </div>
          <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
            An introduction to the principles of computer science.
          </p>
          <ul className="list-disc pl-6">
            <li>Data Structures</li>
            <li>Algorithms</li>
            <li>Computer Architecture</li>
            <li>Programming Fundamentals</li>
          </ul>
        </div>
      </div>
      <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Semester 2
          </h2>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-5 h-5 text-red-600" />
            <span className="text-red-600">Pending</span>
          </div>
          <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
            Introduction to data structures and algorithms.
          </p>
          <ul className="list-disc pl-6">
            <li>Advanced Algorithms</li>
            <li>Database Management</li>
            <li>Operating Systems</li>
            <li>Software Engineering</li>
          </ul>
        </div>
      </div>
      <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Semester 3
          </h2>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-5 h-5 text-red-600" />
            <span className="text-red-600">Pending</span>
          </div>
          <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
            Principles of software engineering.
          </p>
          <ul className="list-disc pl-6">
            <li>Web Development</li>
            <li>Network Security</li>
            <li>Artificial Intelligence</li>
            <li>Software Testing</li>
          </ul>
        </div>
      </div>
      <div className="container flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 md:items-center md:justify-between lg:px-6 xl:max-w-6xl xl:mx-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Semester 4
          </h2>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-5 h-5 text-red-600" />
            <span className="text-red-600">Pending</span>
          </div>
          <p className="text-gray-500 md:text-base/relaxed lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
            Introduction to database management systems.
          </p>
          <ul className="list-disc pl-6">
            <li>Big Data Analytics</li>
            <li>Cloud Computing</li>
            <li>Mobile App Development</li>
            <li>Software Project Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
