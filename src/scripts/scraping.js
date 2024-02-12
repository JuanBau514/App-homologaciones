import {
    load
} from "cheerio";

async function scraping_info_estudiante(htmlContent) {
    // eslint-disable-next-line no-useless-catch
    try {
        const $ = load(htmlContent);
        const tablaEstudiante = $('td');
        const estudianteInfo = {};

        tablaEstudiante.find('tr').each((i, row) => {
            const columns = $(row).find('td');
            const campo = $(columns.eq(0)).text().trim().replace(':', '', ' \n ');
            const valor = $(columns.eq(1)).text().trim();

            // Agregar al objeto solo si el campo es relevante
            const camposRelevantes = ['Nom=\nbre:', ' Nom=\nbre: ', 'C=C3=B3digo', 'Carrera =', 'Plan de E=\nstudios', 'E-Mail <=\n/td>', 'Fecha de =\nnacimiento', 'Promedio =\nAcumulado'];
            if (camposRelevantes.includes(campo)) {
                estudianteInfo[campo] = valor;
            }
        });

        return estudianteInfo;
    } catch (err) {
        throw err;
    }
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

    return materiasLimpias;
}


export {
    limpiarNombreMateria,
    scraping_info_estudiante,
    scraping_materias,

};