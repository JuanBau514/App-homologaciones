import express from 'express';
import cors from 'cors';
import multer from 'multer';
import compararResultado from './Comparar.js';
import {
    readFile,
    writeFile
} from 'fs/promises';
import {
    scraping_info_estudiante,
    scraping_materias
} from './scraping.js';

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar archivos en la solicitud POST
const upload = multer({
    dest: 'uploads/'
});

// Ruta para recibir archivos HTML mediante una solicitud POST
app.post('/api/upload', upload.single('archivo'), async (req, res) => {
    try {
        const file = req.file; // Obtener el archivo del cuerpo de la solicitud
        const htmlContent = await readFile(file.path, {
            encoding: 'utf-8'
        }); // Leer el contenido del archivo
        const datosEstudiante = await scraping_info_estudiante(htmlContent);
        console.log('Datos del estudiante:', datosEstudiante);

        const datosMaterias = await scraping_materias(htmlContent);
        console.log('Materias:', datosMaterias);

        const nombreArchivo = 'materias_estudiante.json';

        // Convertir los datos de materias a un formato compatible con el archivo JSON
        const datosMateriasCompatibles = datosMaterias.map(materia => ({
            codMateria: materia.codMateria,
            nombreMateria: materia.nombreMateria,
            nota: materia.nota,
            creditos: materia.creditos,
            clasificacion: materia.clasificacion,
            year: materia.year
        }));

        // Escribir los datos compatibles en el archivo materias_estudiante.json
        await writeFile(nombreArchivo, JSON.stringify(datosMateriasCompatibles, null, 2));

        // Obtener el resultado de la comparación desde comparar.js después de guardar los datos en el archivo
        const resultadoComparacion = compararResultado();
        console.log('Resultado de la comparación:', resultadoComparacion);

        res.json({
            estudiante: datosEstudiante,
            materias: datosMaterias,
            completadas: resultadoComparacion.completadas,
            faltantes: resultadoComparacion.faltantes,
            mensaje: 'Datos procesados correctamente.',
        });


    } catch (error) {
        console.error('Error al procesar el archivo:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
});

app.get('/api/datos-estudiante', async (req, res) => {
    try {

        // Obtener el resultado de la comparación
        const resultadoMaterias = compararResultado();
        console.log('Resultado de la comparación:', resultadoMaterias);

        res.json({
            Completadas: resultadoMaterias.materiasAprobadas,
            Pendientes: resultadoMaterias.materiasPendientes,
            creditosAprobados: resultadoMaterias.creditosAprobados,
            mensaje: 'Datos procesados correctamente.',
        });
        console.log('Datos del estudiante:', resultadoMaterias);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});