import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { readFile } from 'fs/promises';
import { scraping_info_estudiante, scraping_materias } from './scraping.js';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Variables globales para almacenar los datos del estudiante y las materias
let datosEstudianteGlobal = {};
let materiasGlobal = [];

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

app.post('/api/upload', upload.single('archivo'), async (req, res) => {
  try {
    const file = req.file;
    const htmlContent = await readFile(file.path, { encoding: 'utf-8' });
    const datosEstudiante = await scraping_info_estudiante(htmlContent);
    const datosMaterias = await scraping_materias(htmlContent);
    
    // Guardar los datos en las variables globales
    datosEstudianteGlobal = datosEstudiante;
    materiasGlobal = datosMaterias;

    const creditosAprobados = datosMaterias.reduce((total, materia) => total + (materia.creditos || 0), 0);
    
    // Escribir en el CSV
    await csvWriter.writeRecords([{
      ...datosEstudiante,
      creditosAprobados
    }]);

    console.log('Datos escritos en CSV:', {...datosEstudiante, creditosAprobados});

    res.json({
      estudiante: datosEstudiante,
      materias: datosMaterias,
      mensaje: 'Datos procesados y guardados en CSV correctamente.',
    });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener los datos del estudiante
app.get('/api/datos-estudiante', (req, res) => {
  try {
    const creditosAprobados = materiasGlobal.reduce((total, materia) => total + (materia.creditos || 0), 0);
    
    res.json({
      estudiante: datosEstudianteGlobal,
      materias: materiasGlobal,
      creditosAprobados: creditosAprobados,
      mensaje: 'Datos obtenidos correctamente.',
    });
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/estudiantes', async (req, res) => {
  try {
    const csvContent = await readFile(path.join(__dirname, 'estudiantes.csv'), 'utf-8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const results = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {});
    }).filter(obj => Object.values(obj).some(value => value !== undefined));

    res.json(results);
  } catch (error) {
    console.error('Error al leer el archivo CSV:', error);
    res.status(500).json({ error: 'Error al leer los datos de estudiantes' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});