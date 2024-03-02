import {
    readFileSync
} from 'fs';

var materiasPendientes = [];


// Función para comparar las materias del estudiante con las materias necesarias para graduarse
function compararMaterias(estudianteMaterias, planEstudio) {
    const materiasAprobadas = [];

    estudianteMaterias.forEach(estudianteMateria => {
        const planMateria = planEstudio.find(m => m.codMateria === estudianteMateria.codMateria);
        if (planMateria && estudianteMateria.nota >= 30) {
            const materia = {
                codMateria: estudianteMateria.codMateria,
                nombreMateria: estudianteMateria.nombreMateria,
                nota: estudianteMateria.nota,
                creditos: estudianteMateria.creditos,
                clasificacion: estudianteMateria.clasificacion,
                year: estudianteMateria.year
            };
            materiasAprobadas.push(materia); // Aquí se agrega a materiasAprobadas
        } else {
            materiasPendientes.push(estudianteMateria); // Aquí se agrega a materiasPendientes
        }
    });

    const creditosAprobados = materiasAprobadas.reduce((acc, materia) => acc + parseInt(materia.creditos, 10), 0);

    return {
        materiasAprobadas,
        materiasPendientes,
        creditosAprobados,
    };
}


// Cargar los datos de los archivos JSON
const cargarDatos = () => {
    const datosEstudiante = JSON.parse(readFileSync('materias_estudiante.json', 'utf-8'));
    const materiasGraduacion = JSON.parse(readFileSync("./sistematizacion/Tecnologia-planEstudio-239.json", 'utf-8'));
    return {
        datosEstudiante,
        materiasGraduacion
    };
}

const calcularResultadoComparacion = () => {
    const {
        datosEstudiante,
        materiasGraduacion
    } = cargarDatos();
    return compararMaterias(datosEstudiante, materiasGraduacion);
}

export default calcularResultadoComparacion;