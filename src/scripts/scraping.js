import {
    load
} from "cheerio";

async function scraping_info_estudiante(htmlContent) {
    // eslint-disable-next-line no-useless-catch
    try {
        // Lee el archivo HTML y carga el contenido en Cheerio
        const $ = load(htmlContent);
        // Obtiene los datos del estudiante
        const nombre = $('td:contains("No")').next().text().trim();
        const identificacion = $('td:contains("Identifi")').next().text().trim();
        const codigo = $('td:contains("C=C")').next().text().trim();
        const correoElectronico = $('td:contains("E-Mail:")').next().text().trim();
        const proyectoCurricular = $('td:contains("Carrera:")').next().text().trim();
        const renovaciones = $('td:contains("Renovaci")').next().text().trim();

        // Devuelve la información del estudiante
        return {
            nombre: limpiarTexto(nombre),
            identificacion: limpiarTexto(identificacion),
            codigo: limpiarCodigo(codigo),
            correoElectronico: limpiarTexto(correoElectronico),
            proyectoCurricular: limpiarTexto(proyectoCurricular),
            renovaciones
        };
    } catch (error) {
        throw error;
    }
}

function limpiarCodigo(codigo) {
    codigo = codigo.replace(/\n/g, '');
    codigo = codigo.replace(/=/g, ''); 
    codigo = codigo.replace(/\s+/g, ' ');
    codigo = codigo.slice(0, 11);
    return codigo;
}

function limpiarTexto(texto) {
    texto = texto.replace(/\n/g, '');
    texto = texto.replace(/=/g, ''); 
    texto = texto.replace(/\s+/g, ' ');
    return texto.trim(); // Elimina espacios en blanco al principio y al final
}


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

async function scraping_materias(htmlContent) {
    const $ = load(htmlContent);
    const materias = [];
    let inicioEncontrado = false;

    // Buscar todas las tablas en la página
    $('table').each((_, table) => {
        // Buscar filas que contengan información de materias
        $(table).find('tr').each((_, row) => {
            const columns = $(row).find('td, th');
            if (columns.length >= 6) {
                const codMateria = $(columns.eq(0)).text().trim();
                const nombreMateriaSucio = $(columns.eq(1)).text().trim();
                const nombreMateria = limpiarNombreMateria(nombreMateriaSucio);
                let nota = $(columns.eq(2)).text().trim();
                let creditos = $(columns.eq(3)).text().trim();
                const clasificacion = $(columns.eq(4)).text().trim();
                const year = $(columns.eq(5)).text().trim();

                // Iniciar la captura cuando encontremos "CÁLCULO DIFERENCIAL"
                if (nombreMateria === 'CÁLCULO DIFERENCIAL') {
                    inicioEncontrado = true;
                }

                // Validación y limpieza de datos
                creditos = parseFloat(creditos);
                nota = parseFloat(nota);

                if (isNaN(creditos) || creditos > 5) creditos = null;
                if (isNaN(nota) || nota > 50) nota = null;

                // Agregar la materia si estamos en el rango correcto y cumple con los criterios
                if (inicioEncontrado && 
                    codMateria && 
                    nombreMateria && 
                    !codMateria.includes('Asig') &&
                    !nombreMateria.includes('Nomb') &&
                    !clasificacion.includes('Clasi') &&
                    !year.includes('A=C3') &&
                    codMateria !== 'Total' &&
                    !['OB', 'OC', 'EI', 'EE'].includes(codMateria)) {
                    materias.push({
                        codMateria,
                        nombreMateria,
                        nota,
                        creditos,
                        clasificacion,
                        year
                    });
                }

                // Detener la captura después de "INGENIERÍA DE SOFTWARE -  GERENCIA Y AUDITORÍA EN REDES"
                if (nombreMateria === 'INGENIERÍA DE SOFTWARE') {
                    return false; // Salir del bucle each
                }
            }
        });
    });

    // Filtrar entradas vacías o inválidas
    return materias.filter(materia => 
        materia.codMateria !== '' && 
        materia.nombreMateria !== '' &&
        materia.codMateria !== null &&
        materia.nombreMateria !== null &&
        !isNaN(parseInt(materia.codMateria)) // Asegurarse de que codMateria sea un número
    );
}

export {
    limpiarCodigo,
    limpiarTexto,
    limpiarNombreMateria,
    scraping_info_estudiante,
    scraping_materias,
};