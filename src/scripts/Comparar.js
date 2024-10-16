import {
    readFileSync
} from 'fs';

// Función para comparar las materias del estudiante con las materias necesarias para graduarse
export function compararMaterias(estudianteMaterias, planEstudio) {
    // Filtrar las materias aprobadas (nota >= 30)
    const materiasAprobadas = estudianteMaterias.filter(materia => materia.nota >= 30);

    // Calcular los créditos aprobados
    const creditosAprobados = materiasAprobadas.reduce((acc, materia) => acc + parseInt(materia.creditos, 10), 0);

    // Mapeo de nombres de materias a minúsculas para asegurar coincidencias correctas
    const materiasAprobadasNombres = new Set(materiasAprobadas.map(materia => materia.nombreMateria.toLowerCase().trim()));

    // Identificar las materias faltantes en el plan de estudios
    const materiasPendientes = planEstudio.filter(materia => {
        const nombreMateria = materia.nombreMateria?.toLowerCase().trim();
        // Revisar que la materia esté definida y no esté en la lista de aprobadas
        return nombreMateria && !materiasAprobadasNombres.has(nombreMateria);
    });

    // Construir el resultado de las materias pendientes con datos detallados
    const materiasPendientesDetalladas = materiasPendientes.map(materia => ({
        codMateria: materia.codMateria || null,
        nombreMateria: materia.nombreMateria || null,
        nota: null,
        creditos: materia.creditos || null,
        clasificacion: materia.clasificacion || null,
        year: null
    }));

    // Construir el resultado de las materias aprobadas con datos detallados
    const materiasDetalladas = materiasAprobadas.map(materia => ({
        codMateria: materia.codMateria,
        nombreMateria: materia.nombreMateria,
        nota: materia.nota,
        creditos: materia.creditos,
        clasificacion: materia.clasificacion,
        year: materia.year
    }));

    return {
        materiasAprobadas: materiasDetalladas,
        materiasPendientes: materiasPendientesDetalladas,
        creditosAprobados
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