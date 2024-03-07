import {
    load
} from "cheerio";
import fs from 'fs';

async function obtenerInformacionEstudiante(archivoHTML) {
    // eslint-disable-next-line no-useless-catch
    try {
        // Lee el archivo HTML
        const html = fs.readFileSync(archivoHTML, 'utf8');

        // Carga el HTML en Cheerio
        const $ = load(html);

        // Obtiene los datos del estudiante
        const nombre = $('td:contains("No")').next().text().trim();
        const identificacion = $('td:contains("Identifi")').next().text().trim();
        const codigo = $('td:contains("C=C")').next().text().trim();
        const correoElectronico = $('td:contains("E-Mail:")').next().text().trim();
        const proyectoCurricular = $('td:contains("Carrera:")').next().text().trim();
        const renovaciones = $('td:contains("Renovaci")').next().text().trim();

        // Devuelve la información del estudiante
        return {
            nombre,
            identificacion,
            codigo,
            correoElectronico,
            proyectoCurricular,
            renovaciones
        };
    } catch (error) {
        throw error;
    }
}


export default obtenerInformacionEstudiante;