import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { readFile } from 'fs/promises';
import { scraping_info_estudiante, scraping_materias } from './scraping.js';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());

// Configurar multer para manejar archivos en la solicitud POST
const upload = multer({ dest: 'uploads/' });

let datosEstudianteGlobal = {};
let materiasGlobal = [];

// Ruta para recibir archivos HTML mediante una solicitud POST
app.post('/api/upload', upload.single('archivo'), async (req, res) => {
    try {
        const file = req.file; // Obtener el archivo del cuerpo de la solicitud
        const htmlContent = await readFile(file.path, { encoding: 'utf-8' }); // Leer el contenido del archivo
        const datosEstudiante = await scraping_info_estudiante(htmlContent);
        console.log('Datos del estudiante:', datosEstudiante);

        datosEstudianteGlobal = datosEstudiante; // Guardar los datos del estudiante para su posterior uso

        const datosMaterias = await scraping_materias(htmlContent);
        console.log('Materias:', datosMaterias);

        materiasGlobal = datosMaterias; // Guardar las materias para su posterior uso

        res.json({
            estudiante: datosEstudiante,
            materias: datosMaterias,
            mensaje: 'Datos procesados correctamente.',
        });
    } catch (error) {
        console.error('Error al procesar el archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/guardar-estudiante', async (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body); // Añade este log para depuración

  try {
    const { estudiante, materias } = req.body;

    if (!estudiante || !materias) {
      return res.status(400).json({ error: 'Datos de estudiante o materias faltantes' });
    }

    const csvWriter = createObjectCsvWriter({
      path: path.join(__dirname, 'estudiantes.csv'),
      header: [
        {id: 'nombre', title: 'Nombre'},
        {id: 'identificacion', title: 'Identificación'},
        {id: 'codigo', title: 'Código'},
        {id: 'correoElectronico', title: 'Correo Electrónico'},
        {id: 'renovaciones', title: 'Renovaciones'},
        {id: 'proyectoCurricular', title: 'Proyecto Curricular'},
        {id: 'creditosAprobados', title: 'Créditos Aprobados'},
      ],
      append: true
    });

    const creditosAprobados = materias.reduce((total, materia) => total + (materia.creditos || 0), 0);

    await csvWriter.writeRecords([{
      ...estudiante,
      creditosAprobados
    }]);

    res.json({ mensaje: 'Datos del estudiante guardados en CSV correctamente.' });
  } catch (error) {
    console.error('Error al guardar los datos en CSV:', error);
    res.status(500).json({ error: 'Error al guardar los datos en CSV' });
  }
});

// Ruta para obtener los datos del estudiante y las materias
app.get('/api/datos-estudiante', (req, res) => {
    try {
        const estudiante = datosEstudianteGlobal;
        const materias = materiasGlobal;

        res.json({
            estudiante,
            materias,
            creditosAprobados: materias.reduce((total, materia) => total + (materia.creditos || 0), 0),
            mensaje: 'Datos obtenidos correctamente.',
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
