import {
    readFile,
    writeFile
} from 'fs/promises';
import {
    load
} from "cheerio";
import materiasTecno_239 from './planEstudio239.json';
import infoMaterias from './materias_estudiante.json';


function limpiarNombreMateria(nombre) {
    // Reemplazar caracteres especiales
    nombre = nombre.replace(/=C3=81/g, 'Á');
    nombre = nombre.replace(/=C3=89/g, 'É');
    nombre = nombre.replace(/=C3=8D/g, 'Í');
    nombre = nombre.replace(/=C3=93/g, 'Ó');
    nombre = nombre.replace(/=C3=9A/g, 'Ú');
    nombre = nombre.replace(/=C3=91/g, 'Ñ');
    // Agregar más reemplazos según sea necesario

    // Eliminar cadenas no deseadas
    nombre = nombre.replace(/C=/g, ''); // Eliminar 'C='
    nombre = nombre.replace(/=C3=8D/g, ''); // Eliminar '=C3=8D'

    return nombre.trim(); // Eliminar espacios en blanco al principio y al final
}

async function scraping_materias() {
    const data = await readFile('./araña/Andres.html', {
        encoding: 'utf8'
    });
    const $ = load(data);
    const tablaInteres = $('td');
    const materias = [];

    let omitir = false;

    tablaInteres.find('tr').each((i, row) => {
        const columns = $(row).find('td');
        const codMateria = $(columns.eq(0)).text().trim();

        // Si encontramos "Total", establecemos omitir en true para excluir las siguientes entradas
        if (codMateria === 'Total') {
            omitir = true;
            return;
        }

        // Si estamos en la sección para omitir, no agregamos la entrada actual
        if (omitir) {
            return;
        }

        const nombreMateriaSucio = $(columns.eq(1)).text().trim();
        const nombreMateria = limpiarNombreMateria(nombreMateriaSucio);
        let nota = $(columns.eq(2)).text().trim();
        let creditos = $(columns.eq(3)).text().trim(); // Consideramos los créditos como texto

        // Agregar condicional para establecer créditos y nota en 0 si son mayores a 5
        creditos = parseInt(creditos, 10); // Convertimos a número para la comparación
        nota = parseInt(nota, 10); // Convertimos a número para la comparación

        creditos = creditos > 5 ? 0 : creditos; // Establecemos en 0 si son mayores a 5
        nota = creditos === 0 ? 0 : nota; // Establecemos en 0 si los créditos son 0

        // Agregar condicional para establecer nota y créditos en 0 o null si la nota es mayor a 50
        if (nota > 50) {
            nota = 0;
            creditos = 0; // Puedes cambiar a null si prefieres
        }

        const clasificacion = $(columns.eq(4)).text().trim();
        const year = $(columns.eq(5)).text().trim();

        // Iniciar la impresión al encontrar "DIFERENCIAL" y seguir imprimiendo hasta encontrar "SOFTWARE"
        if (nombreMateria.includes('DIFERENCIAL')) {
            omitir = false;
        }

        // Detener la impresión al encontrar "SOFTWARE"
        if (nombreMateria.includes('SOFTWARE')) {
            omitir = true;
        }

        materias.push({
            codMateria,
            nombreMateria,
            nota,
            creditos,
            clasificacion,
            year
        });
    });

    // Filtrar las entradas no deseadas
    const materiasLimpias = materias.filter(entrada => {
        for (const key in entrada) {
            if (entrada[key] === '' || entrada[key] === null) {
                return false;
            }
        }
        return true;
    });

    return JSON.stringify(materiasLimpias, null, 2);
}

// Llamar a la función y manejar el resultado
scraping_materias().then((datosMaterias) => {
    const nombreArchivo = 'materias_estudiante.json';

    // Guardar los datos en el archivo
    return writeFile(nombreArchivo, datosMaterias, {
        encoding: 'utf8'
    });
}).then(() => {
    console.log('Datos de las materias guardados en el archivo materias_estudiante.json');
}).catch((err) => {
    console.error('Error:', err);
});

function compararMaterias(archivoJSON, planEstudio) {
    // Crear un conjunto para almacenar las materias vistas y aprobadas
    const materiasAprobadasSet = new Set();

    // Crear un conjunto para almacenar todas las materias del plan de estudio
    const planEstudioSet = new Set(planEstudio.map(materia => materia.nombreMateria));

    // Crear un conjunto para almacenar las materias pendientes
    const materiasPendientesSet = new Set(planEstudioSet);

    // Procesar archivoJSON
    archivoJSON.forEach((materia) => {
        if (materia.nota >= 30) {
            const nombreMateria = materia.nombreMateria;

            // Agregar materia a conjunto de materias aprobadas
            materiasAprobadasSet.add(nombreMateria);

            // Eliminar materia del conjunto de materias pendientes
            materiasPendientesSet.delete(nombreMateria);
        }
    });

    // Calcular créditos aprobados
    const creditosAprobados = [...materiasAprobadasSet].reduce((acc, nombreMateria) => {
        const materia = archivoJSON.find(m => m.nombreMateria === nombreMateria);
        return acc + parseInt(materia.creditos, 10);
    }, 0);

    return {
        materiasAprobadas: [...materiasAprobadasSet],
        materiasPendientes: [...materiasPendientesSet],
        creditosAprobados,
    };
}

const resultado = compararMaterias(infoMaterias, materiasTecno_239);
console.log(resultado);
VerificarCreditos(resultado.creditosAprobados);

function VerificarCreditos(creditosAprobados) {
    const CREDITOS_REQUERIDOS = 99;

    if (creditosAprobados >= CREDITOS_REQUERIDOS) {
        console.log('El estudiante ya está listo para graduarse');
    } else {
        const creditosFaltantes = CREDITOS_REQUERIDOS - creditosAprobados;
        console.log(`El estudiante necesita ${creditosFaltantes} créditos para graduarse`);
    }
}



export default {
    scraping_materias,
    compararMaterias,
};