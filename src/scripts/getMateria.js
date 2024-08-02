import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'cheerio';

// Función para obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo HTML
const filePath = path.resolve(__dirname, './html arañas/Académica.html');

function limpiarTexto(texto) {
    // Elimina espacios en blanco adicionales, saltos de línea y otros caracteres no deseados
    return texto.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
}

// Función para extraer el texto de una etiqueta basada en el contenido de una palabra clave
function getTextFromTag(html, tagName, keyword) {
    const $ = load(html);
    const tag = $(`${tagName}:contains("${keyword}")`);
    return tag.length > 0 ? limpiarTexto(tag.text()) : null;
}

function getInfoMaterias(filePath) {
    try {
        // Lee el archivo HTML
        const html = fs.readFileSync(filePath, 'utf8');

        // Carga el HTML en Cheerio
        const $ = load(html);

        // Función para extraer los datos basados en palabras clave
        function getMateriaInfo(palabraClave) {
            const materiaCelda = $(`td:contains("${palabraClave}")`);
            if (materiaCelda.length === 0) return {};

            const materiaNombre = limpiarTexto(materiaCelda.text());
            const codigo = limpiarTexto(materiaCelda.next().text());
            const creditos = limpiarTexto(materiaCelda.next().next().text());
            const tipo = limpiarTexto(materiaCelda.next().next().next().text());
            const año = limpiarTexto(materiaCelda.next().next().next().next().text());
            const periodo = limpiarTexto(materiaCelda.next().next().next().next().next().text());

            return {
                nombre: materiaNombre,
                codigo,
                creditos,
                tipo,
                año,
                periodo
            };
        }

        // Materias Primer Semestre
        const Diferencial = getMateriaInfo('C=C3=81LCULO DIFERENCIAL');
        const Catedra = getMateriaInfo('C=C3=81TEDRA FRANCISCO JOS=C3=89 DE CALDAS');
        const Algebra = getMateriaInfo('=C3=81LGEBRA LINEAL');
        const Democracia = getMateriaInfo('C=C3=81TEDRA DEMOCRACIA Y CIUDADAN=C3=8DA');
        const TextosI = getMateriaInfo('PRODUCCI=C3=93N Y COMPRENSI=C3=93N DE TEXTOS I');
        const Algoritmos = getMateriaInfo('INTRODUCCI=C3=93N A ALGORITMOS');
        const Logica = getMateriaInfo('L=C3=93GICA MATEM=C3=81TICA');

        // Devuelve la información encapsulada en un objeto
        return {
            Diferencial,
            Catedra,
            Algebra,
            Democracia,
            TextosI,
            Algoritmos,
            Logica
        };
    } catch (error) {
        throw error;
    }
}

const infoEstudiante = getInfoMaterias(filePath);
console.log(infoEstudiante);
