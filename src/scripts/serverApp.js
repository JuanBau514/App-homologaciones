import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { readFile, writeFile } from 'fs/promises'; // Usamos writeFile para sobrescribir el archivo JSON
import { scraping_info_estudiante, scraping_materias } from './scraping.js';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';
import {compararMaterias} from'./Comparar.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

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

// Función para guardar las materias en el archivo JSON
async function guardarMateriasEstudiante(materias) {
  try {
    // Aquí se guardan las materias limpias
    await writeFile('materias_estudiante.json', JSON.stringify(materias, null, 2), 'utf-8');
    console.log('Archivo materias_estudiante.json sobrescrito con éxito.');
  } catch (error) {
    console.error('Error al escribir el archivo de materias del estudiante:', error);
  }
}

function limpiarYCompararMaterias(materiasEstudiante, planEstudio) {
  // Filtrar materias con clasificación "EI" y limitar a 19
  const materiasEI = materiasEstudiante.filter(m => m.clasificacion === "EI");
  const materiasLimiteEI = materiasEI.slice(0, 19);

  // Crear un nuevo arreglo de materias, asegurando que no exceda la cantidad de "EI"
  const materiasLimpias = materiasEstudiante.filter(m => m.clasificacion !== "EI")
    .concat(materiasLimiteEI);

  // Comparar con el plan de estudio
  const resultado = compararMaterias(materiasLimpias, planEstudio);

  return {
    materiasLimpias,
    ...resultado
  };
}

app.post('/api/upload', upload.single('archivo'), async (req, res) => {
  try {
    const file = req.file;
    const htmlContent = await readFile(file.path, { encoding: 'utf-8' });
    const datosEstudiante = await scraping_info_estudiante(htmlContent);
    const datosMaterias = await scraping_materias(htmlContent);

    datosEstudianteGlobal = datosEstudiante;
    materiasGlobal = datosMaterias;

    const creditosAprobados = datosMaterias.reduce((total, materia) => total + (materia.creditos || 0), 0);

    await csvWriter.writeRecords([{
      ...datosEstudiante,
      creditosAprobados
    }]);

    // Guardar los datos de materias en el archivo JSON
    await guardarMateriasEstudiante(datosMaterias);

    res.json({
      estudiante: datosEstudiante,
      materias: datosMaterias,
      mensaje: 'Datos procesados y guardados en CSV y JSON correctamente.',
    });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar el endpoint para obtener datos del estudiante
app.get('/api/datos-estudiante', async (req, res) => {
  try {
    // Lee el archivo JSON de materias del estudiante
    const materiasEstudiante = JSON.parse(await readFile('materias_estudiante.json', 'utf-8'));
    
    // Obtén el plan de estudios de alguna fuente
    const planEstudio = JSON.parse(await readFile('./sistematizacion/Tecnologia-planEstudio-239.json', 'utf-8'));

    // Compara y limpia las materias del estudiante
    const resultadoComparacion = limpiarYCompararMaterias(materiasEstudiante, planEstudio);

    // Envía la respuesta con las materias aprobadas y las pendientes
    res.json({
      estudiante: datosEstudianteGlobal,
      materiasAprobadas: resultadoComparacion.materiasAprobadas,
      materiasPendientes: resultadoComparacion.materiasPendientes,
      creditosAprobados: resultadoComparacion.creditosAprobados,
      materiasLimpias: resultadoComparacion.materiasLimpias, // Envío de materias limpias
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

app.delete('/api/eliminar-ultimo-estudiante', (req, res) => {
  const filePath = path.join(__dirname, './estudiantes.csv');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return res.status(500).json({ error: 'Error al leer el archivo.' });
    }

    const parsedData = Papa.parse(data, { header: false }).data;

    if (parsedData.length > 1) {
      parsedData.pop(); // Eliminar la última fila
      const csv = Papa.unparse(parsedData);

      fs.writeFile(filePath, csv, (err) => {
        if (err) {
          console.error('Error al escribir en el archivo:', err);
          return res.status(500).json({ error: 'Error al escribir en el archivo.' });
        }
        res.json({ message: 'Último registro eliminado' });
      });
    } else {
      console.warn('No hay registros para eliminar');
      res.status(400).json({ message: 'No hay registros para eliminar' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});