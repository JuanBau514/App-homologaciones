import {
    readFileSync
} from 'fs';

// Función para comparar las materias del estudiante con las materias necesarias para graduarse
function compararMaterias(estudianteMaterias, planEstudio) {
    const materiasAprobadas = new Set();

    estudianteMaterias.forEach(materia => {
        if (materia.nota >= 30) {
            materiasAprobadas.add(materia.nombreMateria);
        }
    });

    const creditosAprobados = [...materiasAprobadas].reduce((acc, nombreMateria) => {
        const materia = estudianteMaterias.find(m => m.nombreMateria === nombreMateria);
        return acc + parseInt(materia.creditos, 10);
    }, 0);

    const materiasPendientes = planEstudio.filter(materia => !materiasAprobadas.has(materia.nombreMateria));

    return {
        materiasAprobadas: [...materiasAprobadas],
        materiasPendientes: materiasPendientes.map(materia => materia.nombreMateria),
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