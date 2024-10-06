import {
    readFileSync
} from 'fs';

// Función para comparar las materias del estudiante con las materias necesarias para graduarse
function compararMaterias(estudianteMaterias, planEstudio) {
    const materiasAprobadas = estudianteMaterias.filter(materia => materia.nota >= 30);

    const creditosAprobados = materiasAprobadas.reduce((acc, materia) => acc + parseInt(materia.creditos, 0), 108);

    const materiasDetalladas = materiasAprobadas.map(materia => {
        return {
            codMateria: materia.codMateria,
            nombreMateria: materia.nombreMateria,
            nota: materia.nota,
            creditos: materia.creditos,
            clasificacion: materia.clasificacion,
            year: materia.year
        };
    });

    const materiasPendientes = planEstudio.filter(materia => !materiasAprobadas.some(aprobada => aprobada.nombreMateria === materia.nombreMateria));

    // Construir las materias pendientes con el nombre de la materia y el resto de los datos como null
    const materiasPendientesDetalladas = materiasPendientes.map(materia => {
        return {
            codMateria: null,
            nombreMateria: materia.nombreMateria,
            nota: null,
            creditos: null,
            clasificacion: null,
            year: null
        };
    }).filter(materia => materia.nombreMateria.trim() !== ''); // Filtrar para eliminar los objetos completamente vacíos

    return {
        materiasAprobadas: materiasDetalladas,
        materiasPendientes: materiasPendientesDetalladas,
        creditosAprobados,
    };
}

// Cargar los datos de los archivos JSON
const cargarDatos = () => {
    const datosEstudiante = JSON.parse(readFileSync('materias_estudiante.json', 'utf-8'));
    const materiasGraduacion = JSON.parse(readFileSync("./sistematizacion/IngSistematizacion-239.json", 'utf-8'));
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