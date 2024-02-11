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
    // eslint-disable-next-line no-useless-catch
    try {
        const $ = load(htmlContent);
        const tablaMaterias = $('table').eq(1);
        const materias = [];

        tablaMaterias.find('tr').each((i, row) => {
            if (i > 0) {
                const columns = $(row).find('td');
                const materia = {
                    codigo: $(columns.eq(0)).text().trim(),
                    nombre: limpiarNombreMateria($(columns.eq(1)).text()),
                    creditos: $(columns.eq(2)).text().trim(),
                    nota: $(columns.eq(3)).text().trim()
                };
                materias.push(materia);
            }
        });

        return materias;
    } catch (err) {
        throw err;
    }
}


export {
    limpiarNombreMateria,
    scraping_info_estudiante,
    scraping_materias
};